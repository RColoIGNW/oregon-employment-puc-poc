import Employer from './Employer';

export default interface EmploymentRecord {
  id?: number
  employer: Employer;
  started: Date;
  ended: Date;
}
