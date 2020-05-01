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

const Layout = (props : { children: React.ReactNode, alert?: AlertProps|false }) => {
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

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box mr={2}>
            <Img loading="eager" fixed={data.file.childImageSharp.fixed} placeholderStyle={{ visibility: "hidden" }} />
          </Box>
          <Box display={{ xs: 'none', sm: 'block' }}>
            <Typography variant={'h6'}>Pandemic Unemployment Assistance</Typography>
          </Box>
          <Box display={{ xs: 'block', sm: 'none' }}>
            <Typography variant={'subtitle2'} style={{lineHeight: 1}}>Pandemic Unemployment Assistance</Typography>
          </Box>
          <Box display={{xs: 'flex', sm: 'flex'}} style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'fixed',
            top: '10px',
            right: showDebugger ? '100px' : '0',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
          }}>
            {user?.token &&
              <Button variant={'outlined'} style={{ color: '#fff', right: 0 }} onClick={() => signOut()}>
                {`Sign Out`}
              </Button>
            }
          </Box>
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
