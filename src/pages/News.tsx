import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { fetchPosts, fetchTags } from '@/lib/strapi'
import { Calendar, Tag as TagIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

export const News = () => {
  const { i18n, t } = useTranslation('common')
  const [posts, setPosts] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [selectedTagId, setSelectedTagId] = useState<number>(0)
  

  const { data: postResData, isLoading: loadingPosts, error: postsError, refetch: refetchPosts } = useQuery({
    queryKey: ['posts', i18n.language, 1, 12],
    queryFn: () => fetchPosts({ page: 1, pageSize: 12, locale: i18n.language as any }),
  })
  const { data: tagResData, isLoading: loadingTags, error: tagsError, refetch: refetchTags } = useQuery({
    queryKey: ['tags', i18n.language],
    queryFn: () => fetchTags(i18n.language as any),
  })

  useEffect(() => {
    setPosts(postResData?.data ?? [])
  }, [postResData])

  useEffect(() => {
    setTags(tagResData?.data ?? [])
  }, [tagResData])

  const loading = loadingPosts || loadingTags
  const error = (postsError as any)?.message || (tagsError as any)?.message || null

  // 当前选择的标签在新语言中不存在时，重置为全部
  useEffect(() => {
    if (selectedTagId === 0) return
    const exists = (tags ?? []).some((t: any) => t.id === selectedTagId)
    if (!exists) setSelectedTagId(0)
  }, [tags, selectedTagId])

  const filteredPosts = useMemo(() => {
    if (selectedTagId === 0) return posts
    return (posts ?? []).filter((p: any) => {
      const item = p?.attributes ?? p
      const rel = item?.tags?.data ?? item?.tags ?? []
      return rel.some((t: any) => (t?.id === selectedTagId))
    })
  }, [posts, selectedTagId])

  const renderHeader = (
    <div className="text-center mb-10">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
        {t('nav.news')}
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {t('news.page.description')}
      </p>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="max-w-6xl mx-auto px-4">
          {renderHeader}
          <div className="flex justify-center items-center py-16">
            <div className="h-8 w-8 border-2 border-[#0EA5FF] border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-gray-600">{t('news.loading')}</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24">
        <div className="max-w-4xl mx-auto px-4">
          {renderHeader}
          <div className="bg-white shadow-sm rounded-xl p-8 text-center">
            <p className="text-red-600 font-medium mb-2">{t('news.error.title')}</p>
            <p className="text-gray-600 mb-6">{t('news.error.description')}</p>
            <div className="flex justify-center">
              <button onClick={() => { refetchPosts(); refetchTags() }} className="px-5 py-2 bg-[#0EA5FF] text-white rounded-md hover:opacity-90">
                {t('news.error.retry')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-gray-900 pt-24">
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          {renderHeader}

          {/* 标签筛选器 */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedTagId(0)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedTagId === 0 ? 'bg-[#0EA5FF] text-white' : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {t('news.filter.all')}
              </button>
              {(tags ?? []).map((tag: any) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTagId(tag.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedTagId === tag.id ? 'bg-[#0EA5FF] text-white' : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {tag.attributes?.name ?? tag.name ?? `#${tag.id}`}
                </button>
              ))}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              {t('news.no.results')}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((p) => {
                const item = p.attributes ?? p
                const cover = item.coverImage || item.cover || item.Cover
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
                if (!imageUrl) {
                  imageUrl = '/images/tokyo-skyline.jpg'
                }
                const dateText = item.Date || item.date || item.publishedAt
                const docId = item.documentId || p.documentId || p.id
                const itemTags = (item?.tags?.data ?? item?.tags ?? []) as any[]
                return (
                  <article key={p.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {imageUrl && (
                      <div className="relative w-full h-56 md:h-60 overflow-hidden">
                        <img src={imageUrl} alt={item.Title || item.title} className="w-full h-full object-cover" />
                        {/* 标签徽标 */}
                        {itemTags?.length > 0 && (
                          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
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
                    )}
                    <div className="p-4">
                      <h3 className="text-sm md:text-base font-bold leading-snug mb-1 break-words">
                        {item.Title || item.title}
                      </h3>
                      <div className="flex items-center justify-between mb-1">
                        {dateText && (
                          <div className="text-xs text-gray-500 flex items-center">
                            <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                            {new Date(dateText).toLocaleDateString('ja-JP')}
                          </div>
                        )}
                        <Link
                          to={`/news/${docId}`}
                          className="inline-flex items-center px-3 py-1.5 bg-[#0EA5FF] text-white rounded-full text-xs md:text-sm font-medium hover:opacity-90"
                        >
                          {t('news.read.more')}
                        </Link>
                      </div>
                      {item.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{item.excerpt}</p>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}


