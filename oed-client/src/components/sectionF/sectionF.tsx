import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Question } from '../question/question'
import { QuestionModel } from '../../models/Question'

const pageInfo = {
  text: 'I certify that the information I have given on this form is correct, and that I have supplied the information voluntarily, in order to obtain Pandemic Unemployment Assistance. I know that Federal funds are provided and that penalties are prescribed by law for willful misrepresentation or concealment of material facts in order to obtain assistance payments to which I am not entitled to receive under the ACT. The information gathered by the Employment Department may be used by other state and federal agencies for verification of eligibility for other programs. Therefore, I AUTHORIZE the Employment Department to release TO ANY SOURCE the information for purposes authorized under Employment Department law. Furthermore, I attest under penalty of perjury that:',  
}

const question2: QuestionModel = {
  code: 'F_2',
  text: 'If NO, are you in satisfactory immigration status?',
  showOptions: true,
  whenShowDetails: 'ALWAYS',
  note: 'Alien Reg # '
}

const question1: QuestionModel = {
  code: 'F_1',
  text: 'I am a citizen or national of the United States',
  showOptions: true,
  whenShowDetails: 'NEVER',
  subQuestions: [question2]
}

interface SectionProps{
  question: QuestionModel
  onChange: (question: QuestionModel) => void
}

const SectionF = (props: SectionProps) => {
  const handleChange = (q: QuestionModel) => {
    props.onChange(q)
  }
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography variant={'body2'}>
          {pageInfo.text}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction={'column'}>
          <Grid item>
            <Question question={props.question} onChange={handleChange}/>
          </Grid>        
        </Grid>        
      </Grid>
    </Grid>    
  )
}

export default SectionF