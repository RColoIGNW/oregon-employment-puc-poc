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

  const [ableToWorkExpanded, setAbleToWorkExpanded] = useState(false)
  const setAble = (open: boolean) => {setAbleToWorkExpanded(open)}

  const [ableToReportToWorkExpanded, setAbleToReportToWorkExpanded] = useState(false)
  const setReport = (open: boolean) => {setAbleToReportToWorkExpanded(open)}

  const [searchedForWorkExpanded, setSearchedForWorkExpanded] = useState(false)
  const setSearch = (open: boolean) => {setSearchedForWorkExpanded(open)}

  const [didYouWorkLastWeekExpanded, setDidYouWorkLastWeekExpanded] = useState(false)
  const setWorked = (open: boolean) => {setDidYouWorkLastWeekExpanded(open)}

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{questions.ableToWork}</FormLabel>
          <Grid style={{display: 'flex', paddingTop: 10}}>
            <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setAbleToWorkExpanded(true)}>Help</Button>
            {ableToWorkExpanded && <HelpDialog title={'Question 5'} textSections={questions.ableToWorkHelp} openFn={setAble}/>}
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
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{questions.ableToReportToWork}</FormLabel>
          <Grid style={{display: 'flex', paddingTop: 10}}>
            <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setAbleToReportToWorkExpanded(true)}>Help</Button>
            {ableToReportToWorkExpanded && <HelpDialog title={'Question 6'} textSections={questions.ableToReportToWorkHelp} openFn={setReport}/>}
          </Grid>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={applicant.ableToReportToWork === true} onChange={handleBooleanSelection} name="ableToReportToWork" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={applicant.ableToReportToWork === false} onChange={handleBooleanSelection} name="ableToReportToWork" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{questions.searchedForWork}</FormLabel>
          <Grid style={{display: 'flex', paddingTop: 10}}>
            <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setSearchedForWorkExpanded(true)}>Help</Button>
            {searchedForWorkExpanded && <HelpDialog title={'Question 7'} textSections={questions.searchedForWorkHelp} openFn={setSearch}/>}
          </Grid>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={applicant.searchedForWork === true} onChange={handleBooleanSelection} name="searchedForWork" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={applicant.searchedForWork === false} onChange={handleBooleanSelection} name="searchedForWork" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{questions.didYouWorkLastWeek}</FormLabel>
          <Grid style={{display: 'flex', paddingTop: 10}}>
            <Button variant={'outlined'} startIcon={<HelpIcon />} onClick={() => setDidYouWorkLastWeekExpanded(true)}>Help</Button>
            {didYouWorkLastWeekExpanded && <HelpDialog title={'Question 8'} textSections={questions.didYouWorkLastWeekHelp} openFn={setWorked}/>}
          </Grid>
          <RadioGroup>
            <FormControlLabel
              control={<Radio checked={applicant.didYouWorkLastWeek === true} onChange={handleBooleanSelection} name="didYouWorkLastWeek" value={true} disabled={disabled} />}
              label="Yes"
            />
            <FormControlLabel
              control={<Radio checked={applicant.didYouWorkLastWeek === false} onChange={handleBooleanSelection} name="didYouWorkLastWeek" value={false} disabled={disabled} />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}
