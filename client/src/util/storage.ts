enum StorageKey {
  SectionA = 'SectionA',
  SectionB = 'SectionB',
  SectionC = 'SectionC',
  SectionD = 'SectionD',
  SectionE = 'SectionE',
  SectionF = 'SectionF',
}

const save = (key: string, value: any) => {
  typeof window !== 'undefined' && localStorage.setItem(key, JSON.stringify(value))
}

const load = (key: string) => {
  const item = typeof window !== 'undefined' && localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export default {
  save,
  load,
  StorageKey
}
