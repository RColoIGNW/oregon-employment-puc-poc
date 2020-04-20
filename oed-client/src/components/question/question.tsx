import { Grid, FormControlLabel, Checkbox, Typography, TextField } from '@material-ui/core';
import React, { useState } from 'react'

export interface IQuestion {
  code: string
  text: string
  showOptions: boolean
  note?: string  
  whenShowDetails: 'YES' | 'NO' | 'ALWAYS' | 'NEVER'
  componentDetails?: React.ReactNode
  answer?: any
}

interface QuestionProps {
  question: IQuestion
  onChange?: (answer: any) => void
}

export const Question = (props: React.PropsWithChildren<QuestionProps>) => {
  // const theme = useTheme();
  // const isMobile = theme.breakpoints.down('sm')
  const info = {
    yes: 'Yes',
    no: 'No'
  }
  const [selectedOption, setSelectedOption] = useState('')
  const [disableDetails, setDisableDetails] = useState<boolean>(props.question.whenShowDetails !== 'ALWAYS')


  const onChange = (option: 'NO' | 'YES') => {
    setDisableDetails(
      props.question.whenShowDetails !== 'ALWAYS' && props.question.whenShowDetails !== option)
    setSelectedOption(option)
    //TODO: Implement answer
    props.onChange && props.onChange({})
  }
  return (
    <Grid container direction={'column'}>
      <Grid item>
        <Grid container direction={'row'} alignItems={'center'} justify={'space-between'}>
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
      <Grid item>
        {props.children}
      </Grid>
    </Grid>
    
  )
}