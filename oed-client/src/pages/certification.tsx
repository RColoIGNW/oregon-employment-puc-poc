import React, { useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Layout } from '../components/layout/layout'
import { SEO } from '../components/seo/seo'
import { makeStyles, createStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullName: {
      width: 300,
      
    }
  }),
)

export default (props: any) => {
  const classes = useStyles()
  const content = {
    text: 'I hereby certify that the above statements are true and correct to the best of my knowledge. I understand that a false statement may disqualify me for benefits.'
  }
  const applicationId = props.location?.state?.applicationId
  const [certified, setCertified] = useState(false)
  const [fullName, setFullName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setCertified(checked)
  }
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFullName(value)
  }

  const handleSubmit = () => {
    // navigate('confirm')  
  }

  return (
    <Layout>
      <SEO title={'Approvals'} />
      <Container>
        <Grid container>
          <Grid item>
            <form name="certificationForm">
              <Grid container direction="column" spacing={2} justify="center" alignItems="center">
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={certified}
                        onChange={handleChange}
                        name="certified"
                        color="primary"
                      />
                    }
                    label={content.text}
                  />
                </Grid>
                <Grid item>
                  <TextField label="Full Name" value={fullName} onChange={handleFullNameChange} className={classes.fullName}/>
                </Grid>
                <Grid>
                  <Button type="submit" color="primary" variant="contained" size="large">Submit</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}