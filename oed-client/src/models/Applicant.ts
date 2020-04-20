import { Gender } from './Gender';
import { ContactMethod } from './ContactMethod';
import { Race } from './Race';
import { Address } from './Address';

export default interface Applicant {
  firstName: string;
  middleName: string;
  lastName: string;
  ssn: string;
  dob?: Date;
  address: Address;
  phone: string;
  gender?: Gender;
  isHispanicLatino?: boolean;
  contactMethod?: ContactMethod;
  races: Race[];
}
