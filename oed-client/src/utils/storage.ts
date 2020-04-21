enum StorageKey {
  SectionA = 'SectionA'
}

const save = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const load = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export default {
  save,
  load,
  StorageKey
}
