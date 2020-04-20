import React from 'react'
import { Grid, Divider } from '@material-ui/core'
import { Question, IQuestion } from '../question/question'


const SectionD = () => {
  const questions: IQuestion[] = [
    {
      code: 'D_1',
      text: 'At the time of the pandemic, was this self-employment your primary occupation and primary means of livelihood?',
      note: 'If "NO", explain.',
      showOptions: true,
      whenShowDetails: 'NO',
      answer: {}
    },
    {
      code: 'D_2',
      text: 'What services did you perform?',
      note: '',
      showOptions: false,
      whenShowDetails: 'ALWAYS',
      answer: {}
    },
    {
      code: 'D_3',
      text: 'Do you have a business name?',
      note: 'If "YES", what is your business name?',
      showOptions: true,
      whenShowDetails: 'YES',
      answer: {}
    }, 
    {
      code: 'D_4',
      text: 'Do you file a business return? (Ex: Schedule C, 1120 or a 1065)',
      note: 'If "YES", please list what returns you file.',
      showOptions: true,
      whenShowDetails: 'YES',
    },
    {
      code: 'D_5',
      text: 'Do you determine how the work is to be performed?',
      showOptions: true,
      whenShowDetails: 'NEVER',
    },
    // {
    //   code: 'D_5_1',
    //   text: 'Do you have the right to hire someone to help you perform your services?',
    //   note: 'If "YES", can you discharge them?',
    //   showOptions: true,
    //   whenShowDetails: 'YES',
    // },
    {
      code: 'D_6',
      text: 'Do you file a business return? (Ex: Schedule C, 1120 or a 1065)',
      note: 'If "YES", please list what returns you file.',
      showOptions: true,
      whenShowDetails: 'YES',
    },
    {
      code: 'D_7',
      text: 'Do you determine where the work is going to be performed?',
      showOptions: true,
      whenShowDetails: 'NEVER',
    },
    {
      code: 'D_8',
      text: 'Do you determine your rate of compensation?',
      showOptions: true,
      whenShowDetails: 'NEVER',
    },
    {
      code: 'D_9',
      text: 'Do you have an investment in tools, equipment, etc.?',
      note: 'If "YES", how much?',
      showOptions: true,
      whenShowDetails: 'YES',
    },
    {
      code: 'D_10',
      text: 'Can the company you provide services to terminate you?',
      showOptions: true,
      whenShowDetails: 'NEVER',
    },
    {
      code: 'D_11',
      text: 'Do you have more than one client?',
      note: 'If "YES", how many clients do you have?',
      showOptions: true,
      whenShowDetails: 'YES',
    }

  ]
  return (
    <Grid container direction={'column'} spacing={2}>
      {
        questions.map((q) => {
          return (
              <>
                <Grid item>
                  <Question question={q}>
                    <div> TEST CHILD</div>
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

export default SectionD