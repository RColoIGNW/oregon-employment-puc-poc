import React from 'react'
import { Typography, Grid, TextField, Theme, createStyles } from '@material-ui/core'
import { Question, IQuestion } from '../question/question'
import { SectionProps } from '../../models/SectionProps'
import makeStyles from '@material-ui/styles/makeStyles'

import ESignature from '../ESignature' 

const pageInfo = {
  text: 'I certify that the information I have given on this form is correct, and that I have supplied the information voluntarily, in order to obtain Pandemic Unemployment Assistance. I know that Federal funds are provided and that penalties are prescribed by law for willful misrepresentation or concealment of material facts in order to obtain assistance payments to which I am not entitled to receive under the ACT. The information gathered by the Employment Department may be used by other state and federal agencies for verification of eligibility for other programs. Therefore, I AUTHORIZE the Employment Department to release TO ANY SOURCE the information for purposes authorized under Employment Department law. Furthermore, I attest under penalty of perjury that:',
}

const question2: IQuestion = {
  code: 'F_2',
  text: 'If NO, are you in satisfactory immigration status?',
  showOptions: true,
  whenShowDetails: 'NEVER',
  componentDetails: <TextField
    placeholder='Alien Reg # '

  ></TextField>
}

const question1: IQuestion = {
  code: 'F_1',
  text: 'I am a citizen or national of the United States',
  showOptions: true,
  whenShowDetails: 'NEVER',
  componentDetails: <Question question={question2} />
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullName: {
      width: 300,

    }
  }),
)

const SectionF = (props: SectionProps) => {
  const classes = useStyles()
  const { application, onChange } = props

  const handleChange = () => {
    onChange && onChange({ ...application, })
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
            <Question question={question1}></Question>
          </Grid>
          <Grid item>
            <Question question={question2}></Question>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <ESignature application={application} onChange={onChange} />
      </Grid>
    </Grid>
  )
}

export default SectionF