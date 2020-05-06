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
  address: Address
  phone: string
}

export interface EmploymentRecord {
  id?: number
  employer: Employer
  started: Date
  ended: Date
}

export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

// export interface QuestionModel {
//   code: string
//   text: string
//   showOptions: boolean
//   note?: string
//   whenShowDetails: 'YES' | 'NO' | 'ALWAYS' | 'NEVER'
//   whenShowSubQuestions: 'YES' | 'NO' | 'ALWAYS' | 'NEVER'
//   subQuestions?: QuestionModel[]
//   isDisabled?:  boolean
//   answer: AnswerModel
//   errorMessage?: string
//   detailErrorMessage?: string
// }

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

// export interface WeeklyClaimSchema {
//   ableToWork: boolean,
//   awayFromResidence: boolean,
//   seekedEmployment: boolean,
//   veteran: boolean,
//   temporaryUnemployment: boolean,
//   employmentHistory?: EmploymentRecord[]
//   id?: string
// }

export interface Applicant {
  firstName: string
  middleName: string
  lastName: string
  ssn: string
  dob?: Date
  address?: Address
  phone: string
  email: string
  gender?: Gender
  isHispanicLatino?: boolean
  contactMethod?: ContactMethod
  races: Race[]
  adminNote: string
}

export interface ApplicationSchema {
  employmentRecords?: EmploymentRecord[]
  uid: string
  adminNote?: string
  answersSectionC: AnswerModel[]
  answersSenctionD: AnswerModel[]
  answersSectionE: AnswerModel[]
  answersSectionF: AnswerModel[]
  id: string
  applicant?: Applicant
  status?: ApplicationStatus,
  lastModified?: Date,
  answers?: AnswerModel[]
  isCertified: boolean
  certifiedBy: string
  dateApplied?: Date
}
