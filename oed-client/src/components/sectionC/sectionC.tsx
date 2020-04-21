import React from 'react'
import { Grid, Divider, makeStyles, Theme, createStyles } from '@material-ui/core'
import { IQuestion, Question } from '../question/question'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    separator: {
      padding: theme.spacing(1, 0),
    }
  }),
)

interface SectionCProps{
  questions: IQuestion[],
  handleChange: (question: IQuestion) => void
}

const SectionC = (props: SectionCProps) => {
  const classes = useStyles()
  return (
    <Grid container direction={'column'} spacing={1}>
      {
        props.questions.map((q) => {
          return (
              <div key={q.code}>
                <Grid item >
                  <Question question={q} showErrors={props.showErrors}/>
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