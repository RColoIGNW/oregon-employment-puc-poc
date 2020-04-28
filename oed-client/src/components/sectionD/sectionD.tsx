import React from 'react'
import { SectionProps } from '../../models/SectionProps'
import useQuestions from '../../hooks/useQuestions'
import QuestionList from '../question-list/question-list'
import { AnswerModel } from '../../models/Answer'

const SectionD = (props: SectionProps) => {
  const { application, onChange } = props 
  const answers = props.application.answers || []
  const { getQuestions } = useQuestions(answers)
  const questions = getQuestions('SECTION_D')

  const handleChange = (answer: AnswerModel) => {    
    const index = answers.findIndex(a => a.questionCode === answer.questionCode)
    if (index === -1){
      answers.push(answer)
    } else {
      answers[index] = answer
    }    
    onChange && onChange({...application, answers: answers})
  }
  return (    
    <QuestionList questions={questions} onChange={handleChange}/>
  )
}

export default SectionD