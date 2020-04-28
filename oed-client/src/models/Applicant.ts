import Address from './Address';
import { ContactMethod } from './ContactMethod';
import { Gender } from './Gender';
import { Race } from './Race';

export default interface Applicant {
  firstName: string;
  middleName: string;
  lastName: string;
  ssn: string;
  dob?: Date;
  address?: Address;
  phone: string;
  email: string;
  gender?: Gender;
  isHispanicLatino?: boolean;
  contactMethod?: ContactMethod;
  races: Race[];
  adminNote: string
}
