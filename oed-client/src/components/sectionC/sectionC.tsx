import React from 'react'
import { Grid } from '@material-ui/core'
import { Question } from '../question/question'
import { QuestionModel } from '../../models/Question'
import { AnswerModel } from '../../models/Answer'
interface SectionCProps{
  value: QuestionModel[],
  onChange: (answer: AnswerModel) => void
}

const SectionC = (props: SectionCProps) => {
  const questions = props.value
  const handleChange = (a: AnswerModel) => {
    props.onChange(a)
  }

  return (
    <Grid container direction={'column'} spacing={1}>
      {
        questions.map((q) => {
          return (
              <div key={q.code}>
                <Grid item >
                  <Question question={q} onChange={handleChange}/>
                </Grid>               
              </div>
          )
        })       
      }
    </Grid>
  )
}

export default SectionC
