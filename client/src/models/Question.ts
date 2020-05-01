import { AnswerModel } from "./Answer";

export interface QuestionModel {
  code: string
  text: string
  showOptions: boolean
  note?: string  
  whenShowDetails: 'YES' | 'NO' | 'ALWAYS' | 'NEVER' 
  whenShowSubQuestions: 'YES' | 'NO' | 'ALWAYS' | 'NEVER' 
  subQuestions?: QuestionModel[]
  isDisabled?:  boolean
  answer: AnswerModel
  errorMessage?: string
  detailErrorMessage?: string
}