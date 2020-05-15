export enum workRecordType {
  searching = "searching",
  seeking = "seeking",
}

export default interface EmploymentRecord {
  type: string
  id?: number
  employer?: string | null
  date: Date
  location?: string | null
  contactMethod?: string | null
  typeOfWorkSought?: string | null
  result?: string | null
  activity?: string | null
}
