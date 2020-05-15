import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core"
import React, { useEffect, useRef, useState } from "react"

import { AnswerModel } from "../../models/Answer"
import { QuestionModel } from "../../models/Question"

// const useFocus = () => {
// 	const htmlElRef = useRef()
// 	const setFocus = () => {htmlElRef && htmlElRef.current &&  htmlElRef.current.focus()}
// 	return [ htmlElRef,  setFocus ]
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    questionBox: {
      margin: theme.spacing(1, 0),
      background: "#f5f5f5",
    },
    questionDetails: {
      margin: theme.spacing(0, 0, 0, 3),
    },
    error: {
      color: "red",
    },
  })
)
interface QuestionProps {
  question: QuestionModel
  onChange: (answer: AnswerModel) => void
  isDisabled?: boolean
}

export const Question = (props: QuestionProps) => {
  const classes = useStyles()
  let focusTimer: NodeJS.Timeout | any = undefined
  // let [detailsInput, setDetailsFocus] = useFocus()
  const detailsInput: any = useRef(null)
  const { answer } = props.question
  // const [answer, setAnswer] = useState(props.question.answer)

  const info = {
    yes: "Yes",
    no: "No",
  }

  const [disableDetails, setDisableDetails] = useState<boolean>(
    props.question.whenShowDetails !== props.question.answer.selectedOption &&
      props.question.whenShowDetails !== "ALWAYS"
  )

  const [showSubQuestions, setShowSubQuestions] = useState<boolean>(
    props.question.whenShowSubQuestions === "ALWAYS" ||
      props.question.whenShowSubQuestions ===
        props.question.answer.selectedOption
  )
  const handleOptionChange = (option: "NO" | "YES") => {
    setDisableDetails(
      props.question.whenShowDetails !== "ALWAYS" &&
        props.question.whenShowDetails !== option
    )
    setShowSubQuestions(
      props.question.whenShowSubQuestions === "ALWAYS" ||
        props.question.whenShowSubQuestions === option
    )

    if (props.question.whenShowDetails === option) {
      // detailsInput.current.focus()
      focusTimer = setTimeout(() => {
        if (detailsInput && detailsInput.current) {
          detailsInput.current.focus()
        }
      }, 10)
    }
    // setAnswer({...answer, selectedOption: option, detailInfo: props.question.whenShowDetails !== option ? '' : answer.detailInfo })
    props.onChange({
      ...answer,
      selectedOption: option,
      detailInfo:
        props.question.whenShowDetails !== option ? "" : answer.detailInfo,
    })
  }

  const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setAnswer({...answer, detailInfo: event.target.value })
    props.onChange({ ...answer, detailInfo: event.target.value })
  }

  const handleSubQuestionAnswerChange = (a: AnswerModel) => {
    const subAnswers = answer.subQuestionsAnwers || []
    const index = subAnswers.findIndex(
      (ans) => ans.questionCode === a.questionCode
    )
    if (index === -1) {
      subAnswers.push(a)
    } else {
      subAnswers[index] = a
    }
    // setAnswer({...answer, subQuestionsAnwers: subAnswers})
    props.onChange({ ...answer, subQuestionsAnwers: subAnswers })
  }

  // useEffect(() => {
  //   props.onChange(answer)
  // }, [answer])

  useEffect(() => {
    return () => clearTimeout(focusTimer)
  }, [])

  return (
    <Card className={classes.questionBox}>
      <CardContent>
        <Grid container={true} direction={"column"}>
          <Grid item={true}>
            <Grid
              container={true}
              direction={"row"}
              alignItems={"center"}
              justify={"space-between"}
            >
              {/* {
                props.showErrors && isValidAnswer() &&
              <Grid item className={classes.error}>
                {error}
              </Grid>
              } */}
              <Grid item={true}>
                <Typography variant={"body2"}>{props.question.text}</Typography>
              </Grid>
              {props.question.showOptions && (
                <Grid item={true}>
                  <Grid
                    container={true}
                    direction={"row"}
                    spacing={2}
                    justify={"flex-end"}
                  >
                    <Grid item={true}>
                      <FormControlLabel
                        label={info.yes}
                        control={
                          <Checkbox
                            data-testid={props.question.code}
                            color={"primary"}
                            checked={answer?.selectedOption === "YES"}
                            onChange={() => handleOptionChange("YES")}
                            name="yesAnswer"
                            disabled={!!props.isDisabled}
                          />
                        }
                      />
                    </Grid>
                    <Grid item={true}>
                      <FormControlLabel
                        label={info.no}
                        control={
                          <Checkbox
                            color={"primary"}
                            checked={answer?.selectedOption === "NO"}
                            onChange={() => handleOptionChange("NO")}
                            name="noAnswer"
                            disabled={!!props.isDisabled}
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item={true} className={classes.questionDetails}>
            <Grid container={true} direction={"column"} spacing={1}>
              {props.question.note && (
                <Grid item={true}>
                  <Typography variant={"body2"}>
                    {props.question.note}
                  </Typography>
                </Grid>
              )}
              {props.question.whenShowDetails !== "NEVER" && (
                <Grid item={true}>
                  <TextField
                    id="answer-details"
                    disabled={disableDetails}
                    multiline={true}
                    rows={2}
                    variant={disableDetails ? "filled" : "outlined"}
                    style={
                      disableDetails ? { border: 0 } : { background: "#FFFFFF" }
                    }
                    value={answer?.detailInfo || ""}
                    onChange={handleDetailChange}
                    fullWidth={true}
                    inputRef={detailsInput}
                    // ref={el => detailsInput = el}
                  />
                  {/* <input
                    type="text"
                    ref={detailsInput} /> */}
                </Grid>
              )}
              {props.question.subQuestions &&
                showSubQuestions &&
                props.question.subQuestions.map((sq) => {
                  return (
                    <Grid item={true} key={sq.code}>
                      <Question
                        question={sq}
                        onChange={handleSubQuestionAnswerChange}
                        isDisabled={props.isDisabled}
                      />
                    </Grid>
                  )
                })}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
