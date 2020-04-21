import React from 'react'
import { Grid, Divider, makeStyles, Theme, createStyles } from '@material-ui/core'
import { Question } from '../question/question'
import { QuestionModel } from '../../models/Question'




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    separator: {
      padding: theme.spacing(1, 0),
    }
  }),
)

interface SectionCProps{
  questions: QuestionModel[],
  onChange: (question: QuestionModel) => void
}

const SectionC = (props: SectionCProps) => {
  const classes = useStyles()
  const handleChange = (q: QuestionModel) => {
    props.onChange(q)
  }
  return (
    <Grid container direction={'column'} spacing={1}>
      {
        props.questions.map((q) => {
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