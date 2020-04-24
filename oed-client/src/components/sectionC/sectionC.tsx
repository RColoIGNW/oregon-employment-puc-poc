import React from 'react'
import { Grid, Divider, makeStyles, Theme, createStyles } from '@material-ui/core'
import { Question } from '../question/question'
import { QuestionModel } from '../../models/Question'
import { AnswerModel } from '../../models/Answer'





const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    separator: {
      padding: theme.spacing(1, 0),
    }
  }),
)

interface SectionCProps{
  value: QuestionModel[],
  onChange: (answer: AnswerModel) => void
}

const SectionC = (props: SectionCProps) => {
  const classes = useStyles()
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
                <Grid item className={classes.separator} >
                  <Divider/>
                </Grid>
              </div>
          )
        })       
      }
    </Grid>
  )
}

export default SectionC
