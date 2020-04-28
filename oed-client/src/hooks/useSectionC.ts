import { QuestionModel } from '../models/Question'
import { AnswerModel } from '../models/Answer'
import storage from '../util/storage'




   


export default () => {
  
  const prepareQuestions = (): QuestionModel[]   => {
      return _questions.map(q => {
        const _answer = currentAnswers.find((a) => a.questionCode === q.code)
        let subQuestions = q.subQuestions
        if(_answer && _answer.subQuestionsAnwers){
          subQuestions = q.subQuestions?.map((subQ) => {
            const subQAnswer  = _answer.subQuestionsAnwers?.find(sqa => sqa.questionCode === subQ.code) || subQ.answer            
            return {...subQ, answer: subQAnswer}
          })
        }
        return {...q, answer: _answer || q.answer, subQuestions: subQuestions}
      } )
  }

  let currentAnswers: AnswerModel[] = storage.load(storage.StorageKey.SectionC) || []

  let questions = prepareQuestions()
  
  const handleChange = (a: AnswerModel) => {
    console.log('SAVE')
    const index = questions.findIndex((q) => q.code === a.questionCode)
    questions[index].answer = a
  }
  const handleSubmit = (): {answers: AnswerModel[], hasErrors: boolean} => {
    const answers = questions.map( q => q.answer)
    return {answers: answers, hasErrors: false}
  }

  return {
    handleChange,
    handleSubmit,
    questions
  }
}