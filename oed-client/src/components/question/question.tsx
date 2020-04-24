import { Grid, FormControlLabel, Checkbox, Typography, TextField, makeStyles, Theme, createStyles } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react'
import { QuestionModel } from '../../models/Question'
import { AnswerModel } from '../../models/Answer';

// const useFocus = () => {
// 	const htmlElRef = useRef()
// 	const setFocus = () => {htmlElRef && htmlElRef.current &&  htmlElRef.current.focus()}
// 	return [ htmlElRef,  setFocus ] 
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({   
    questionDetails: {
      margin: theme.spacing(0, 0, 0, 3),
    },
    error: {
      color: 'red'
    }

  }),
);
interface QuestionProps {
  question: QuestionModel
  onChange: (answer: AnswerModel) => void
  isDisabled?: boolean
}

export const Question = (props: QuestionProps) => {
  const classes = useStyles()
  let focusTimer: NodeJS.Timeout
  //let [detailsInput, setDetailsFocus] = useFocus() 
  let detailsInput = useRef(null)
  const [answer, setAnswer] = useState(props.question.answer)
  
  const info = {
    yes: 'Yes',
    no: 'No'
  }

  const [disableDetails, setDisableDetails] = useState<boolean>(
    props.question.whenShowDetails !== props.question.answer.selectedOption  && props.question.whenShowDetails !== 'ALWAYS' 
     )
  const handleOptionChange = (option: 'NO' | 'YES') => {
    setDisableDetails(props.question.whenShowDetails !== 'ALWAYS' && props.question.whenShowDetails !== option)
    console.log('TEST')
    if (props.question.whenShowDetails === option) {
      //detailsInput.current.focus()
      focusTimer  = setTimeout(() => {
        if (detailsInput && detailsInput.current){
          detailsInput.current.focus()
        }
      }, 10)
    } 
    setAnswer({...answer, selectedOption: option, detailInfo: props.question.whenShowDetails !== option ? '' : answer.detailInfo })
  }

  const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {        
    setAnswer({...answer, detailInfo: event.target.value })
  }



  const handleSubQuestionAnswerChange = (a : AnswerModel) => {       
    const subAnswers = answer.subQuestionsAnwers    || []
    const index = subAnswers.findIndex(ans => ans.questionCode === a.questionCode) 
    if (index === -1) {
      subAnswers.push(a)
    } else {
      subAnswers[index] = a
    }
    setAnswer({...answer, subQuestionsAnwers: subAnswers})    
  }

  useEffect(() => {
    props.onChange(answer)
  }, [answer])

  useEffect(() => {    
    return () => clearTimeout(focusTimer);
  }, []);

  return (
    <Grid container direction={'column'}>
      <Grid item>
        <Grid container direction={'row'} alignItems={'center'} justify={'space-between'}>
          {/* { 
             props.showErrors && isValidAnswer() &&
          <Grid item className={classes.error}>
            {error}
          </Grid>
          } */}
          <Grid item>
            <Typography variant={'body2'}>
              {props.question.text}
            </Typography>
          </Grid>
          { props.question.showOptions &&
          <Grid item>
            <Grid container direction={'row'} spacing={2} justify={'flex-end'}>
              <Grid item >
                <FormControlLabel
                  label={info.yes}
                  control={
                    <Checkbox 
                      color={'primary'} 
                      checked={answer?.selectedOption === 'YES'} 
                      onChange={() => handleOptionChange('YES')} 
                      name="yesAnswer" 
                      disabled={!!props.isDisabled}
                    />
                  }
                />
              </Grid>
              <Grid item >
                <FormControlLabel
                  label={info.no}
                  control={
                    <Checkbox 
                      color={'primary'} 
                      checked={answer?.selectedOption  === 'NO'} 
                      onChange={() => handleOptionChange('NO')} 
                      name="noAnswer" 
                      disabled={!!props.isDisabled}
                    />
                  }                  
                />
              </Grid>
            </Grid>
          </Grid>
          }
        </Grid>
      </Grid>
      <Grid item className={classes.questionDetails}>
        <Grid container direction={'column'} spacing={1}>
          { 
            props.question.note &&
            <Grid item>
              <Typography variant={'body2'}>
                {props.question.note}
              </Typography>
            </Grid>
          }
          { 
            props.question.whenShowDetails!== 'NEVER' &&
            <Grid item>
              <TextField 
                id="answer-details"            
                disabled={disableDetails}
                multiline
                rows={2}          
                variant={ disableDetails ? 'filled': 'outlined' }
                value={answer?.detailInfo || ''}
                onChange={handleDetailChange}
                fullWidth
                inputRef={detailsInput}
                // ref={el => detailsInput = el}
              />
              {/* <input
                type="text"
                ref={detailsInput} /> */}
            </Grid>
          }
          {
            props.question.subQuestions &&
            props.question.subQuestions.map((sq) => {
              return (
                <Grid item key={sq.code}>
                  <Question question={sq} onChange={handleSubQuestionAnswerChange} isDisabled={props.isDisabled}/>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
    </Grid>    
  )
}
