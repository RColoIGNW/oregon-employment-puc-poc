enum StorageKey {
  SectionA = 'SectionA',
  SectionB = 'SectionB',
  SectionC = 'SectionC',
  SectionD = 'SectionD',
  SectionE = 'SectionE',
  SectionF = 'SectionF',
  WeeklySection1 = 'WeeklySection1',
  WeeklySection2 = 'WeeklySection2',
}

const save = (key: string, value: any) => {
  typeof window !== 'undefined' && value && localStorage.setItem(key, JSON.stringify(value))
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
