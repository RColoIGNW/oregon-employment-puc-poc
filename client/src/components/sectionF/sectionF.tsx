import { Grid, Typography } from "@material-ui/core"
import React from "react"

import useQuestions from "../../hooks/useQuestions"
import { AnswerModel } from "../../models/Answer"
import { SectionProps } from "../../models/SectionProps"
import ESignature from "../ESignature"
import { Question } from "../question/question"

const pageInfo = {
  text:
    "I certify that the information I have given on this form is correct, and that I have supplied the information voluntarily, in order to obtain Pandemic Unemployment Assistance. I know that Federal funds are provided and that penalties are prescribed by law for willful misrepresentation or concealment of material facts in order to obtain assistance payments to which I am not entitled to receive under the ACT. The information gathered by the Employment Department may be used by other state and federal agencies for verification of eligibility for other programs. Therefore, I AUTHORIZE the Employment Department to release TO ANY SOURCE the information for purposes authorized under Employment Department law. Furthermore, I attest under penalty of perjury that:",
}

const SectionF = (props: SectionProps) => {
  const { application, onChange } = props
  const answers = props.application.answers || []
  const { getQuestions } = useQuestions(answers)
  const questions = getQuestions("SECTION_F")

  const handleChange = (answer: AnswerModel) => {
    const index = answers.findIndex(
      (a) => a.questionCode === answer.questionCode
    )
    if (index === -1) {
      answers.push(answer)
    } else {
      answers[index] = answer
    }
    onChange && onChange({ ...application, answers })
  }

  return (
    <Grid container={true} direction={"column"} spacing={2}>
      <Grid item={true}>
        <Typography variant={"body2"}>{pageInfo.text}</Typography>
      </Grid>
      <Grid item={true}>
        <Grid container={true} direction={"column"}>
          <Grid item={true}>
            <Question question={questions[0]} onChange={handleChange} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item={true}>
        <ESignature application={application} onChange={onChange} />
      </Grid>
    </Grid>
  )
}

export default SectionF
