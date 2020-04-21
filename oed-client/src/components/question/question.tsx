import { Grid, FormControlLabel, Checkbox, Typography, TextField, makeStyles, Theme, createStyles } from '@material-ui/core';
import React, { useState } from 'react'


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

export interface IAnswer {
  questionCode: string
  selectedOption?: 'YES' | 'NO'
  detailInfo?: string
  subQuestionsAnwers?: IAnswer[]
}
export interface IQuestion {
  code: string
  text: string
  showOptions: boolean
  note?: string  
  whenShowDetails: 'YES' | 'NO' | 'ALWAYS' | 'NEVER'
 // componentDetails?: React.ReactNode
  subQuestions?: IQuestion[]
  isDisabled?:  boolean
  answer?: IAnswer
  errorMessage?: string
  detailErrorMessage?: string
}

interface QuestionProps {
  question: IQuestion
  showErrors: boolean
  onChange?: (answer: any) => void
}

export const Question = (props: React.PropsWithChildren<QuestionProps>) => {
  const classes = useStyles()
  const info = {
    yes: 'Yes',
    no: 'No'
  }
  const [selectedOption, setSelectedOption] = useState('')
  const [disableDetails, setDisableDetails] = useState<boolean>(props.question.whenShowDetails !== 'ALWAYS')
  const error = 'Invalid answer'

  const onChange = (option: 'NO' | 'YES') => {
    setDisableDetails(
      props.question.whenShowDetails !== 'ALWAYS' && props.question.whenShowDetails !== option)
    setSelectedOption(option)
    //TODO: Implement answer
    props.onChange && props.onChange({})
  }

  const isValidAnswer= (): boolean => {
    return false
  }

  return (
    <Grid container direction={'column'}>
      <Grid item>
        <Grid container direction={'row'} alignItems={'center'} justify={'space-between'}>
          { 
            props.showErrors && isValidAnswer() &&
          <Grid item className={classes.error}>
            {error}
          </Grid>
          }
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
                  control={<Checkbox color={'primary'} checked={selectedOption === 'YES'} onChange={() => onChange('YES')} name="yesAnswer" />}
                  label={info.yes}
                />
              </Grid>
              <Grid item >
                <FormControlLabel
                  control={<Checkbox color={'primary'} checked={selectedOption === 'NO'} onChange={() => onChange('NO')} name="noAnswer" />}
                  label={info.no}
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
                fullWidth
              />
            </Grid>
          }
          {
            props.question.subQuestions &&
            props.question.subQuestions.map((sq) => {
              return (
                <Grid item key={sq.code}>
                  <Question question={sq} />
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
    </Grid>    
  )
}