import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Question} from '../question/question'
import { QuestionModel } from '../../models/Question'
import { SectionProps } from '../../models/SectionProps'
import useQuestions from '../../hooks/useQuestions'
import { AnswerModel } from '../../models/Answer'

const pageInfo = {
  text: 'Any unemployment insurance benefits you receive are fully taxable income if you are required to file a tax return. You may need to make estimated tax payments. For more information on estimated tax payments, contact the Internal Revenue Service. For state tax information, contact the Oregon Department of Revenue.',
  note1: 'You may choose to have 10% of your benefits withheld for federal taxes and/or 6% for state taxes.',  
  note2: 'This authorization will remain in effect for this claim until the Oregon Employment Department has received written notification from you of its termination.',
}
const SectionE = (props: SectionProps) => {
  const { application, onChange } = props 
  const { getQuestions } = useQuestions(props.application.answers || [])
  const questions = getQuestions('SECTION_E')

  const handleChange = (answer: AnswerModel) => {    
    const index = questions.findIndex((q: QuestionModel) => q.code === answer.questionCode)
    questions[index].answer = answer    
    //TODO: combine answers
    onChange && onChange({...application, answers: questions.map(q => q.answer)})
  }
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography variant={'body2'}>
          {pageInfo.text}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={'body2'}>
          {pageInfo.note1}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction={'column'}>
          {
            questions.map( (q) => {
              <Grid item>
                <Question question={q} onChange={handleChange}/>
              </Grid>
            })
          }  
        </Grid>        
      </Grid>
      <Grid item>
        <Typography variant={'body2'}>
          {pageInfo.note2}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default SectionE