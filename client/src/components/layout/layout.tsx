import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from '@material-ui/core/Typography'
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React, { useContext } from "react"

import { AuthContext } from '../../providers/AuthProvider'
import Alerts from '../alerts'
import { AlertProps } from '../alerts/Alerts'
import { CSSDebugger } from "../css-debugger"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import UserMenu from "./UserMenu"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      [theme.breakpoints.down('xs')]: {
        fontSize: 'small',
      },
    },
  }),
);

const Layout = (props: { children: React.ReactNode, alert?: AlertProps | false }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "orgov_logo.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 158, height: 38) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const { children, alert } = props
  const { signOut, user } = useContext(AuthContext)
  const showDebugger = typeof window !== 'undefined' && !!window.location.href.includes('localhost')
  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Hidden xsDown>
            <Img loading="eager" fixed={data.file.childImageSharp.fixed} placeholderStyle={{ visibility: "hidden" }} />
          </Hidden>
          <Typography variant={'h6'} className={classes.title}>Pandemic Unemployment Assistance</Typography>
          {user?.token &&
            <UserMenu />
          }
        </Toolbar>
      </AppBar>
      <Container>
        {showDebugger &&
          <CSSDebugger />
        }
        <Toolbar />
        {!!alert &&
          <Grid item style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1em',
          }}>
            <Alerts
              isOpen={true}
              variant={alert?.variant || 'outlined'}
              severity={alert?.severity || 'info'}
              message={alert?.message}
              {...alert}
            />
          </Grid>
        }
        <main>{children}</main>
      </Container>
    </>
  )
}

export { Layout };
