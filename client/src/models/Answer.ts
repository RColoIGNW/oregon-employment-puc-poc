export interface AnswerModel {
  questionCode?: string
  selectedOption?: "YES" | "NO"
  detailInfo?: string
  subQuestionsAnwers?: AnswerModel[]
}
