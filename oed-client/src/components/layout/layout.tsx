import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from '@material-ui/core/Typography'
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React, { useContext } from "react"

import { AuthContext } from '../../providers/AuthProvider'
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// Components
import { CSSDebugger } from "../css-debugger";

const Layout: React.FC = ({ children }) => {
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

  const { signOut, user } = useContext(AuthContext)

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
            right: '100px',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
          }}>
            {user?.token &&
              <Button variant={'outlined'} style={{ color: '#fff' }} onClick={() => signOut()}>
                {`Sign Out`}
              </Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <CSSDebugger />
        <Toolbar />
        <main>{children}</main>
      </Container>
    </>
  );
};

export { Layout };
