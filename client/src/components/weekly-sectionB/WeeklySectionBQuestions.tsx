import React, { useState } from "react"
import Grid from '@material-ui/core/Grid'
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import questions from "../weekly-form/questions"
import { WeeklySectionProps } from "../../models/WeeklySectionProps"
import Button from "@material-ui/core/Button"
import HelpIcon from "@material-ui/icons/Help"
import HelpDialog from "../weekly-sectionC/HelpDialog"

const defaultValue = {
  ableToWork: true,
  awayFromResidence: false,
  employmentHistory: [],
  applicationId: ''
}

export default (props: WeeklySectionProps) => {
  const applicant = props.application || defaultValue

  const { isDisabled } = props
  const disabled = !!isDisabled

  const handleBooleanSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    props.handleChange({ ...applicant, [name]: checked && value === 'true' })


  }

  const [awayFromResidenceExpanded, setAwayFromResidenceExpanded] = useState(false)
  const setAway = (open: boolean) => {setAwayFromResidenceExpanded(open)}

  const [ableToWorkExpanded, setAbleToWorkExpanded] = useState(false)
  const setAble = (open: boolean) => {setAbleToWorkExpanded(open)}

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{questions.awayFromResidence}</FormLabel>
          <Grid style={{display: 'flex', paddingTop: 10}}>
            <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setAwayFromResidenceExpanded(true)}>Help</Button>
            {awayFromResidenceExpanded && <HelpDialog title={'Question 1'} textSections={questions.awayFromResidenceHelp} openFn={setAway}/>}
          </Grid>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={applicant.awayFromResidence === true} onChange={handleBooleanSelection} name="awayFromResidence" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={applicant.awayFromResidence === false} onChange={handleBooleanSelection} name="awayFromResidence" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{questions.ableToWork}</FormLabel>
          <Grid style={{display: 'flex', paddingTop: 10}}>
            <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setAbleToWorkExpanded(true)}>Help</Button>
            {ableToWorkExpanded && <HelpDialog title={'Question 2'} textSections={questions.ableToWorkHelp} openFn={setAble}/>}
          </Grid>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={applicant.ableToWork === true} onChange={handleBooleanSelection} name="ableToWork" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={applicant.ableToWork === false} onChange={handleBooleanSelection} name="ableToWork" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>

    </Grid>
    </Grid>
  )
}
