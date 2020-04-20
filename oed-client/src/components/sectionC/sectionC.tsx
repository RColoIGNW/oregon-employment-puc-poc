import React from 'react'
import { Grid, Divider } from '@material-ui/core'
import { IQuestion, Question } from '../question/question'

const question_c_2_details: IQuestion[]= [
  {
    code: 'C_2_1',
    text: '(1) Unemployment compensation under any State or Federal law?',
    showOptions: true,    
    whenShowDetails: 'NEVER'    
  },
  {
    code: 'C_2_2',    
    text: '(2) Any amounts for loss of wages due to illness or disability?',
    showOptions: true,    
    whenShowDetails: 'NEVER'    
  },
  {
    code: 'C_2_3',    
    text: '(3) Any type of private income protection insurance?',
    showOptions: true,    
    whenShowDetails: 'NEVER'    
  },
  {
    code: 'C_2_4',
    text: '(4) Any amount as a supplemental unemployment benefit (SUB)?',
    showOptions: true,    
    whenShowDetails: 'NEVER'    
  }

]

const questions: IQuestion[] = [
  {
    code: 'C_1',
    text: 'Are you receiving or will you receive retirement pay (other than Social Security) within the next 12 months?',
    showOptions: true,    
    whenShowDetails: 'NEVER'    
  },
  {
    code: 'C_2',
    text: 'Did you apply for or receive, or would you be eligible to receive if you had ever applied for',
    showOptions: true,
    whenShowDetails: 'NEVER',
    componentDetails: <Grid container direction={'column'}>
      {
        question_c_2_details.map((q) => (
          <Grid item>
            <Question question={q}/>
          </Grid>
        ))
      }
    </Grid>
  },
  {
    code: 'C_3',
    text: 'Have you been diagnosed with COVID–19 or are you experiencing symptoms of COVID–19 and seeking a medical diagnosis?',
    showOptions: true,
    note: 'If "YES", please enter the date you were diagnosed or when you began experiencing symptoms',
    whenShowDetails: 'YES'    
  }
  ,{
    code: 'C_4',
    text: 'Has a member of your household has been diagnosed with COVID–19?',
    showOptions: true,
    note: 'If "YES", please enter the date the household member was diagnosed.',
    whenShowDetails: 'YES'    
  }
  ,{
    code: 'C_5',
    text: 'Are you caring for a family member or a member of your household who has been diagnosed with COVID–19?',
    showOptions: true,
    note: 'If "YES", please enter the date the household member was diagnosed.',
    whenShowDetails: 'YES'    
  },{
    code: 'C_6',
    text: 'Is there a child or other person in the household for which you have primary caregiving responsibility that is unable to attend school or another facility that is closed as a direct result of the COVID-19 public health emergency and such school or facility care is required?',
    showOptions: true,
    note: 'If "YES", please enter the name of the facility that closed and the date of the closure.',
    whenShowDetails: 'YES'    
  }, {
    code: 'C_7',
    text: 'Have you become the breadwinner or provider of major support for a household because the head of the household has died as a direct result of COVID–19?',
    showOptions: true,
    note: 'If "YES", please enter the date you became the provider for a household.',
    whenShowDetails: 'YES'    
  }, {
    code: 'C_8',
    text: 'Has your place of employment closed as a direct result of the COVID–19 public health emergency?',
    showOptions: true,
    note: 'If "YES", please enter the date your place of employment closed and the name of the business.',
    whenShowDetails: 'YES'    
  }, {
    code: 'C_9',
    text: 'Have you quit a job as a direct result of COVID–19?',
    showOptions: true,
    note: 'If "YES", please enter the date you quit, the name of the business, and the reason you voluntarily left work.',
    whenShowDetails: 'YES'    
  }, {
    code: 'C_10',
    text: 'Were you scheduled to start a new job that has since closed as a direct result of the COVID-19 public health emergency?',
    showOptions: true,
    note: 'If "YES", please enter the date you were expected to start work, the date your new job closed, and the name of the business.',
    whenShowDetails: 'YES'    
  }, {
    code: 'C_11',
    text: 'Are you unable to reach your place of employment because you have been advised by a health care provider to self-quarantine due to concerns related to COVID–19?',
    showOptions: true,
    note: 'If "YES", please enter the reason why you are unable to reach your place of employment and the date this began.',
    whenShowDetails: 'YES'    
  }, {
    code: 'C_12',
    text: 'Are you unable to reach your place of employment because of a quarantine imposed as a direct result of the COVID-19 public health emergency?',
    showOptions: true,
    note: 'If "YES", please enter the reason why you are unable to reach your place of employment and the date this began.',
    whenShowDetails: 'YES'    
  }, {
    code: 'C_13',
    text: 'Do you have the ability to continue to receive payment from your employer while working from home?',
    showOptions: true,
    note: 'If "YES", please enter the reason why you have refused to accept a teleworking option from your employer.',
    whenShowDetails: 'YES'    
  }, {
    code: 'C_14',
    text: 'Are you receiving paid sick leave or other paid leave benefits?',
    showOptions: true,
    note: 'If "YES", please enter the date you began to receive paid sick leave or paid leave benefits and who you are receiving this payment from, if you know an end date please include that.',
    whenShowDetails: 'YES'    
  }, {
    code: 'C_15',
    text: 'Are you currently self-employed?',
    showOptions: true,
    note: 'If "YES", you MUST answer the questions in section D.',
    whenShowDetails: 'YES'    
  }, 
]
const SectionC = () => {
  return (
    <Grid container direction={'column'} spacing={2}>
      {
        questions.map((q) => {
          return (
              <>
                <Grid item>
                  <Question question={q}>
                    {q.componentDetails}
                  </Question>
                </Grid>
                <Grid item>
                  <Divider/>
                </Grid>
              </>
          )
        }) 
      
      }
    </Grid>
  )
}

export default SectionC