export interface ToolRecord {
  id: string | number
  title: string
  summary?: string
  tags?: string[]
}

export function useSearch(list: ToolRecord[]) {
  function search(q: string) {
    if (!q) return list
    const k = q.toLowerCase()
    return list.filter(it => (it.title + ' ' + (it.summary || '') + ' ' + (it.tags || []).join(' ')).toLowerCase().includes(k))
  }
  return { search }
}


