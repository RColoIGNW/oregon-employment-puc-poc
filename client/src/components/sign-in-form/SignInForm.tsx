import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Link } from "gatsby"
import React from "react"
import { useTranslation } from "react-i18next"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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
  const { t } = useTranslation()

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "-4em" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color={"primary"} component="h1" variant="h5">
          {t("login.signIn")}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth={true}
          id="email"
          label={t("login.email")}
          name="email"
          autoComplete="email"
          autoFocus={true}
          onChange={props.handleChange}
          onKeyUp={props.onKeyUp}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth={true}
          name="password"
          label={t("login.password")}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={props.handleChange}
          onKeyUp={props.onKeyUp}
        />
        <FormControlLabel
          style={{
            left: 0,
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
          control={<Checkbox value="remember" color="primary" />}
          label={t("login.rememberMe")}
        />
        <Button
          type="submit"
          fullWidth={true}
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={props.handleSubmit}
        >
          {t("login.signIn")}
        </Button>
        <Grid
          container={true}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid item={true}>
            <Link to={"/forgot-password"}>{t("login.forgotPassword")}</Link>
          </Grid>
          <Grid item={true}>
            <Link to={"/sign-up"}>{t("login.signUp")}</Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
