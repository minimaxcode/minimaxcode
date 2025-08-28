import Strapi, { StrapiLocale } from 'strapi-sdk-js'


export const strapi = new Strapi({
  url: import.meta.env.VITE_STRAPI_URL,
})

// Prefer API Token (Strapi v4/v5) via Authorization: Bearer <token>
const __API_TOKEN = import.meta.env.VITE_STRAPI_TOKEN as string | undefined
if (__API_TOKEN) {
  try {
    // Use SDK helper (stores token & sets axios header)
    strapi.setToken(__API_TOKEN)
  } catch (_e) {
    // Fallback: set axios header directly
    // @ts-ignore
    if (strapi?.axios?.defaults) {
      // @ts-ignore
      strapi.axios.defaults.headers.common['Authorization'] = `Bearer ${__API_TOKEN}`
    }
  }
}

export async function fetchPosts({ page = 1, pageSize = 10, locale = 'ja' }: { page?: number, pageSize?: number, locale?: StrapiLocale } = {}) {
  // 集合类型为 Article → REST 路由 /api/articles
  return strapi.find('articles', {
    // 仅返回列表所需字段（注意：字段名区分大小写，后端定义为 Title/Date；id 总会返回无需声明）
    fields: ['documentId', 'Title', 'Date', 'publishedAt'],
    populate: {
      Cover: { fields: ['url', 'formats'] },
      // 列表页一般不需要作者的所有信息，最小化返回
      Auther: { fields: ['id'] },
      tags: { fields: ['name'] },
    },
    sort: 'publishedAt:desc',
    pagination: { page, pageSize },
    locale,
  })
}

export async function fetchPostById(id: string, locale: StrapiLocale = 'ja') {
  // 详情建议按 id 查询；若未来有 slug 字段再改回过滤
  const res = await strapi.findOne('articles', id, {
    populate: ['Cover', 'Auther', 'tags'],
  })
  // v5 的 findOne 返回 { data, meta }
  return res?.data ?? null
}

export async function fetchTags(locale: StrapiLocale = 'ja') {
  // 标签表为 tags，字段包含 name 与 locale
  return strapi.find('tags', {
    fields: ['name'],
    pagination: { page: 1, pageSize: 100 },
    locale,
    sort: 'name:asc',
  })
}

export async function fetchPostByDocumentId(documentId: string | number, locale: StrapiLocale = 'ja') {
  // 优先按 documentId + locale 查询当前语言版本；若无则返回 null
  const res = await strapi.find('articles', {
    populate: ['Cover', 'Auther', 'tags'],
    filters: {
      documentId: { $eq: documentId },
    },
    locale,
    pagination: { page: 1, pageSize: 1 },
  })
  const item = Array.isArray(res?.data) && res.data.length > 0 ? res.data[0] : null
  return item ?? null
}


