import React from "react"

import useQuestions from "../../hooks/useQuestions"
import { AnswerModel } from "../../models/Answer"
import { SectionProps } from "../../models/SectionProps"
import QuestionList from "../question-list/question-list"

const SectionC = (props: SectionProps) => {
  const { application, onChange } = props
  const answers = props.application.answers || []
  const { getQuestions } = useQuestions(answers)
  const questions = getQuestions("SECTION_C")

  const handleChange = (answer: AnswerModel) => {
    const index = answers.findIndex(
      (a) => a.questionCode === answer.questionCode
    )
    if (index === -1) {
      answers.push(answer)
    } else {
      answers[index] = answer
    }
    onChange && onChange({ ...application, answers })
  }
  return <QuestionList questions={questions} onChange={handleChange} />
}

export default SectionC
