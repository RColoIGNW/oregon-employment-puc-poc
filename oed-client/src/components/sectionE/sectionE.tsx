import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Question, IQuestion } from '../question/question'

const pageInfo = {
  text: 'Any unemployment insurance benefits you receive are fully taxable income if you are required to file a tax return. You may need to make estimated tax payments. For more information on estimated tax payments, contact the Internal Revenue Service. For state tax information, contact the Oregon Department of Revenue.',
  note1: 'You may choose to have 10% of your benefits withheld for federal taxes and/or 6% for state taxes.',  
  note2: 'This authorization will remain in effect for this claim until the Oregon Employment Department has received written notification from you of its termination.',
}

const question1: IQuestion = {
  code: 'E_1',
  text: 'Do you choose to have 10% of your unemployment benefits withheld for federal income taxes?',
  showOptions: true,
  whenShowDetails: 'NEVER'
}

const question2: IQuestion = {
  code: 'E_2',
  text: 'Do you choose to have 6% of your unemployment benefits withheld for state income taxes?',
  showOptions: true,
  whenShowDetails: 'NEVER'
}

const SectionE = () => {

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
          <Grid item>
            <Question question={question1}></Question>
          </Grid>
          <Grid item>
            <Question question={question2}></Question>
          </Grid>
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