import Employer from './Employer';

export default interface EmploymentRecord {
  employer: Employer;
  started: Date;
  ended: Date;
}
