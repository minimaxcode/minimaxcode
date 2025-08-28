import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

export interface SmartContentRendererProps {
  content: string
  className?: string
}

enum ContentKind {
  FullHtml = 'full_html',
  HtmlFragment = 'html_fragment',
  MarkdownOrText = 'markdown_text',
}

function detectKind(content: string): ContentKind {
  const c = content?.trim() || ''
  if (!c) return ContentKind.MarkdownOrText
  const lower = c.toLowerCase()
  if (lower.includes('<html') || lower.includes('<!doctype')) return ContentKind.FullHtml
  if (/[<][a-z/!][^>]*>/i.test(c)) return ContentKind.HtmlFragment
  return ContentKind.MarkdownOrText
}

const ContentLoading: React.FC = () => (
  <div className="flex items-center justify-center p-8 text-gray-400 text-sm">Loading...</div>
)

const FullHtmlIframe: React.FC<{ html: string; className?: string }> = ({ html, className }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(800)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        if (doc) {
          const style = doc.createElement('style')
          style.textContent = 'html,body{margin:0;padding:0;overflow:hidden;height:auto}'
          doc.head.appendChild(style)
          setTimeout(() => {
            const h = Math.max(
              doc.documentElement.scrollHeight,
              doc.body.scrollHeight,
              doc.documentElement.offsetHeight,
              doc.body.offsetHeight,
              600,
            )
            setHeight(h + 16)
            setLoading(false)
          }, 600)
        }
      } catch {
        setHeight(Math.max(html.length * 0.25, 800))
        setLoading(false)
      }
    }
    iframe.addEventListener('load', handleLoad)
    return () => iframe.removeEventListener('load', handleLoad)
  }, [html])
  return (
    <div className="relative">
      {loading && <ContentLoading />}
      <iframe
        ref={iframeRef}
        srcDoc={html}
        className={`w-full border-0 rounded-lg ${className || ''}`}
        style={{ height, opacity: loading ? 0 : 1 }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        scrolling="no"
        title="html"
      />
    </div>
  )
}

export const SmartContentRenderer: React.FC<SmartContentRendererProps> = ({ content, className = '' }) => {
  const kind = useMemo(() => detectKind(content), [content])
  const base = (import.meta.env.VITE_STRAPI_URL || '').replace(/\/$/, '')

  // 预处理
  const preprocess = (raw: string) => {
    let s = String(raw || '').replace(/\r\n?/g, '\n')
    s = s.replace(/!\{u[^}]*\}/gi, '').replace(/!\[u=[^\]]*\]/gi, '')
    s = s.replace(/!\[([^\]]*?)\]\s*\r?\n\(\s*([^\)]+?)\s*\)/g, '![$1]($2)')
    s = s.replace(/(^|[\s，。;,])\(\s*(https?:\/\/[^\s)]+\.(?:png|jpe?g|webp|gif))\s*\)/gi, (_m, p1, url) => `${p1}![](${url})`)
    if (base) {
      s = s.replace(/\]\((\/uploads\/[^)]+)\)/g, (_m, p1) => `](${base}${p1})`)
      s = s.replace(/(^|[\s（(])http:\/\/localhost:1337\/([^\s)]+)/g, (_m, p1, rest) => `${p1}${base}/${rest}`)
      s = s.replace(/(^|[\s，。;,])\(\s*(\/uploads\/[^)]+)\s*\)/g, (_m, p1, path) => `${p1}![](${base}${path})`)
    }
    return s
  }

  const isFullHtml = (s: string) => {
    const lower = s.trim().toLowerCase()
    if (/^\s*(<!doctype|<html|<head|<body)/.test(lower)) return true
    try {
      const doc = new DOMParser().parseFromString(s, 'text/html')
      const first = doc?.body?.firstElementChild?.tagName?.toLowerCase()
      return first === 'html' || first === 'head' || first === 'body'
    } catch { return false }
  }

  const markdownScore = (s: string) => {
    try {
      const tokens: any[] = marked.lexer(s)
      let structural = 0, inline = 0
      tokens.forEach((t: any) => {
        if (['heading','list','table','blockquote','code'].includes(t.type)) structural++
        if (t.type === 'paragraph' && /\*\*|__|\*[^*]+\*|_[^_]+_|!\[[^\]]*\]\([^)]*\)/.test(t.text || '')) inline++
        if (t.type === 'html') inline++
      })
      return structural * 2 + inline
    } catch { return 0 }
  }

  const looksLikeHtmlFragment = (s: string) => {
    try {
      const doc = new DOMParser().parseFromString(s, 'text/html')
      const blocks = Array.from(doc.body.querySelectorAll('div,p,section,article,table,ul,ol,pre,figure,img'))
      return blocks.length >= 2
    } catch { return false }
  }

  const splitMixed = (s: string): Array<{ type: 'html' | 'text'; content: string }> => {
    const out: Array<{ type: 'html' | 'text'; content: string }> = []
    try {
      const tokens: any[] = marked.lexer(s)
      let buf: string[] = []
      const flush = () => { if (buf.length) { out.push({ type: 'text', content: buf.join('\n') }); buf.length = 0 } }
      tokens.forEach((t: any) => {
        if (t.type === 'html') { flush(); out.push({ type: 'html', content: t.text || '' }) }
        else { if (t.raw) buf.push(t.raw); else if (t.text) buf.push(t.text); else buf.push(String(t)) }
      })
      flush()
    } catch { out.push({ type: 'text', content: s }) }
    return out
  }

  const normalized = useMemo(() => preprocess(content), [content])

  const resolvedKind: ContentKind = useMemo(() => {
    if (isFullHtml(normalized)) return ContentKind.FullHtml
    const mdScore = markdownScore(normalized)
    const htmlFrag = looksLikeHtmlFragment(normalized)
    if (mdScore >= 3 && htmlFrag) return ContentKind.HtmlFragment // 走混合/片段渲染
    if (mdScore >= 3) return ContentKind.MarkdownOrText
    if (htmlFrag) return ContentKind.HtmlFragment
    return ContentKind.MarkdownOrText
  }, [normalized])

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[SmartContentRenderer] input kind=', kind, 'resolvedKind=', resolvedKind, 'raw=', String(content).slice(0, 300))
  }

  if (!content) return null

  if (resolvedKind === ContentKind.FullHtml) {
    return (
      <Suspense fallback={<ContentLoading />}>
        <FullHtmlIframe html={normalized} className={className} />
      </Suspense>
    )
  }

  if (resolvedKind === ContentKind.HtmlFragment && /<[^>]+>/.test(normalized)) {
    const sanitized = DOMPurify.sanitize(normalized)
    return <div className={`prose prose-lg max-w-none p-6 ${className}`} dangerouslySetInnerHTML={{ __html: sanitized }} />
  }

  // markdown-only 或混合中的 text
  marked.setOptions({ gfm: true, breaks: true })
  const blocks = splitMixed(normalized)
  if (blocks.length === 1 && blocks[0].type === 'text') {
    const html = DOMPurify.sanitize(marked.parse(blocks[0].content) as string)
    return <div className={`prose prose-lg max-w-none p-6 ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
  }
  return (
    <div className={`smart-content-renderer ${className}`}>
      {blocks.map((b, i) => {
        if (b.type === 'html') {
          const sanitized = DOMPurify.sanitize(b.content)
          return <div key={`html-${i}`} className="prose prose-lg max-w-none p-6" dangerouslySetInnerHTML={{ __html: sanitized }} />
        }
        const html = DOMPurify.sanitize(marked.parse(b.content) as string)
        return <div key={`text-${i}`} className="prose prose-lg max-w-none p-6" dangerouslySetInnerHTML={{ __html: html }} />
      })}
    </div>
  )
}

export default SmartContentRenderer


