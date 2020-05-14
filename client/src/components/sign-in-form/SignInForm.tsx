import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link } from 'gatsby'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface SignInFormProps {
  email: string
  password: string
  rememberMe?: boolean
  handleChange: (event: any) => void
  handleSubmit: () => any
  onKeyUp: (event: any) => any
}

export default function SignIn(props: SignInFormProps) {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs" style={{marginTop: '-4em'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color={'primary'} component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={props.handleChange}
          onKeyUp={props.onKeyUp}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={props.handleChange}
          onKeyUp={props.onKeyUp}
        />
        <FormControlLabel
          style={{left: 0, display: 'flex', justifyContent: 'flex-start', width: '100%'}}
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={props.handleSubmit}
        >
          Sign In
        </Button>
        <Grid container style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Grid item>
            <Link to={'/forgot-password'}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to={'/sign-up'}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
