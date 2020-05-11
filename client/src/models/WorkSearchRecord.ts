export default interface EmploymentRecord {
  id?: number,
  employer: string,
  date: Date,
  location: string,
  contactMethod: string,
  typeOfWorkSought: string,
  result: string,
  unionMember: boolean,
  tempLayoff: boolean,
}
