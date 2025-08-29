import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { fetchPostByDocumentId } from '@/lib/strapi'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import SmartContentRenderer from '@/components/SmartContentRenderer'
import { StrapiLocale } from 'strapi-sdk-js'
import { Calendar, Tag as TagIcon } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const NewsDetail = () => {
  const { slug = '' } = useParams()
  const { i18n, t } = useTranslation('common')
  const [post, setPost] = useState<any | null>(null)
  

  // 先计算 attrs 与内容 HTML，避免在条件 return 前调用 hooks 数量不一致
  const attrs = (post?.attributes ?? post ?? {}) as any
  const rawContent = attrs.Content ?? attrs.content ?? ''
  const itemTags = (attrs?.tags?.data ?? attrs?.tags ?? []) as any[]
  const dateText = attrs?.Date || attrs?.date || attrs?.publishedAt
  const htmlContent = useMemo(() => {
    if (!rawContent) return ''
    const isLikelyMarkdown = typeof rawContent === 'string' && /[#*_`\-\[\]]/.test(rawContent)
    const html = isLikelyMarkdown ? marked.parse(String(rawContent)) : String(rawContent)
    return DOMPurify.sanitize(html as string)
  }, [rawContent])

  const queryClient = useQueryClient()
  const initialFromList = () => {
    const lists: any = queryClient.getQueriesData({ queryKey: ['posts', i18n.language] })
    for (const [_key, val] of lists) {
      const arr = (val as any)?.data ?? []
      const hit = arr.find((p: any) => {
        const attrs = p?.attributes ?? p
        const docId = attrs?.documentId || p?.documentId || p?.id
        return String(docId) === String(slug)
      })
      if (hit) return hit
    }
    return undefined
  }
  const { data: detailData, isLoading, error: detailError } = useQuery({
    enabled: !!slug,
    queryKey: ['post', slug, i18n.language],
    queryFn: () => fetchPostByDocumentId(slug!, i18n.language as StrapiLocale),
    // 使用列表项作为占位数据，同时强制认为是陈旧数据，触发后台刷新
    placeholderData: initialFromList(),
    staleTime: 0,
  })

  useEffect(() => { setPost(detailData as any) }, [detailData])
  const loading = isLoading
  const error = (detailError as any)?.message || null

  // 组装 SEO
  useEffect(() => {
    if (!post) return
    const attrs = post.attributes ?? {}
    const metaTitle = attrs.seo?.metaTitle || attrs.title
    const metaDescription = attrs.seo?.metaDescription || attrs.excerpt || ''
    if (metaTitle) document.title = metaTitle
    const setMeta = (name: string, content: string) => {
      if (!content) return
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    setMeta('description', metaDescription)
    // Open Graph
    const setOG = (property: string, content: string) => {
      if (!content) return
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    setOG('og:title', metaTitle)
    setOG('og:description', metaDescription)
    if (attrs.coverImage?.data?.attributes?.url) setOG('og:image', attrs.coverImage.data.attributes.url)
  }, [post])

  if (loading) return <div className="pt-24 max-w-5xl mx-auto px-4">Loading...</div>
  if (error) return <div className="pt-24 max-w-5xl mx-auto px-4 text-red-600">{error}</div>
  if (!post) {
    return (
      <div className="min-h-screen pt-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white shadow-sm rounded-xl p-8 text-center">
            <p className="text-gray-800 text-lg font-semibold mb-2">
              {t('news.detail.notfound.title')}
            </p>
            <p className="text-gray-600 mb-6">
              {t('news.detail.notfound.description')}
            </p>
            <div className="flex justify-center">
              <Link to="/news" className="px-5 py-2 bg-[#0EA5FF] text-white rounded-md hover:opacity-90">
                {t('news.back.to.list')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-gray-900 pt-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* 面包屑 */}
        <nav className="mb-4 text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-[#0EA5FF]">ホーム</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/news" className="hover:text-[#0EA5FF]">{t('nav.news', 'News')}</Link>
            </li>
            <li>/</li>
            <li className="text-gray-700">{attrs.Title ?? attrs.title}</li>
          </ol>
        </nav>
      </div>
      <article className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-2xl shadow-sm">
        {/* 顶部图 + 左下角标签 */}
        <div className="mb-6">
          {(() => {
            const cover = attrs.coverImage || attrs.cover || attrs.Cover
            let imageUrl = ''
            if (Array.isArray(cover) && cover.length > 0) {
              imageUrl = cover[0]?.url || cover[0]?.formats?.large?.url || cover[0]?.formats?.thumbnail?.url || ''
            } else if (cover?.data) {
              const m = Array.isArray(cover.data) ? cover.data[0] : cover.data
              const mAttrs = m?.attributes ?? m
              imageUrl = mAttrs?.url || mAttrs?.formats?.large?.url || mAttrs?.formats?.thumbnail?.url || ''
            }
            if (imageUrl && imageUrl.startsWith('/')) {
              const base = (import.meta.env.VITE_STRAPI_URL || '').replace(/\/$/, '')
              imageUrl = base + imageUrl
            }
            return imageUrl ? (
              <div className="relative">
                <img src={imageUrl} alt={attrs.Title ?? attrs.title ?? ''} className="w-full h-auto max-h-96 object-contain bg-gray-100 rounded-xl" />
                {itemTags && itemTags.length > 0 && (
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                    {itemTags.slice(0, 2).map((tg: any) => {
                      const label = tg?.attributes?.name ?? tg?.name ?? ''
                      return (
                        <span key={tg.id} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 shadow">
                          <TagIcon className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          {label}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : null
          })()}
        </div>

        {/* 标题与日期 */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">{attrs.Title ?? attrs.title}</h1>
        {dateText && (
          <div className="text-sm text-gray-500 mb-6 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(dateText).toLocaleDateString('ja-JP')}
          </div>
        )}

        {/* 正文渲染 */}
        <div className="mt-2">
          <SmartContentRenderer content={rawContent || ''} className="prose-headings:text-gray-900" />
        </div>
      </article>
    </div>
  )
}


