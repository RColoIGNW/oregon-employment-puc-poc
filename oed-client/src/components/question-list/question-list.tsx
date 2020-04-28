import { AnswerModel } from "../../models/Answer"
import { QuestionModel } from "../../models/Question"
import React from "react"
import { Grid } from "@material-ui/core"
import { Question } from "../question/question"

interface QuestionListProps{
  questions: QuestionModel[],
  onChange: (answer: AnswerModel) => void
}

const QuestionList = (props: QuestionListProps) => {
  const { questions } = props
  const handleChange = (answer: AnswerModel) => {
    props.onChange && props.onChange(answer)
  }

  return (
    <Grid container direction={'column'} spacing={1}>
      {
        questions.map((q) => {
          return (
              <div id={q.code} key={`section-c-${q.code}`}>
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


export default QuestionList