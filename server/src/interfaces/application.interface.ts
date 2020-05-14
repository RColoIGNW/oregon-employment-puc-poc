export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
}

export enum ApplicationStatus {
  InProgress = 'InProgress',
  Submitted = 'Submitted',
  Cancelled = 'Cancelled',
  Approved = 'Approved',
  Denied = 'Denied'
}

export enum ContactMethod {
  Phone = 'Phone',
  Email = 'Email'
}

export interface AnswerModel{
  questionCode?: string
  selectedOption?: 'YES' | 'NO'
  detailInfo?: string
  subQuestionsAnwers?: AnswerModel[]
}

export interface Employer {
  name: string
  address?: Address
  phone: string
}

export interface EmploymentRecord {
  id?: number|string
  employer: Employer
  started: Date|string
  ended: Date|string
}

export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export enum Race {
  AmericanIndianOrAlaskaNative = 'American Indian or Alaska Native',
  Asian = 'Asian',
  HawaiianNativeOrOtherPacificIslander = 'Hawaiian Native or Other Pacific Islander',
  White = 'White',
  BlackOrAfricanAmerican = 'Black or African American',
  Other = 'Other'
}

export const Races: Race[] = [
  Race.AmericanIndianOrAlaskaNative,
  Race.Asian,
  Race.HawaiianNativeOrOtherPacificIslander,
  Race.White,
  Race.BlackOrAfricanAmerican,
  Race.Other
]

export interface Applicant {
  firstName: string
  middleName: string
  lastName: string
  ssn: string
  dob?: Date|string
  address?: Address
  phone: string
  email: string
  gender?: Gender
  isHispanicLatino?: boolean
  contactMethod?: ContactMethod
  races: Race[]
  adminNote?: string
}

export default interface ApplicationSchema {
  employmentRecords?: EmploymentRecord[]
  uid?: string // deprecate
  adminNote?: string
  id?: string
  applicant?: Applicant
  status?: ApplicationStatus
  createdDate?: Date|string
  lastModified?: Date|string
  answers?: AnswerModel[]
  isCertified?: boolean
  certifiedBy?: string
  dateApplied?: Date|string
  dateCreated?: Date|string
  userId?: string
}

// export interface WeeklyClaimSchema { // TODO: recreate in its own file
//   ableToWork: boolean,
//   awayFromResidence: boolean,
//   seekedEmployment: boolean,
//   veteran: boolean,
//   temporaryUnemployment: boolean,
//   employmentHistory?: EmploymentRecord[]
//   id?: string
// }
