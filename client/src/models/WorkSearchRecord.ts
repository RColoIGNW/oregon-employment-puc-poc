export default interface EmploymentRecord {
  type: "searching" | "seeking",
  id?: number,
  employer?: string | null,
  date: Date,
  location?: string | null,
  contactMethod?: string | null,
  typeOfWorkSought?: string | null,
  result?: string | null,
  activity?: string | null,
}
