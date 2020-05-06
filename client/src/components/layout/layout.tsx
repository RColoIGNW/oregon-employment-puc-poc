import React, { useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from "@material-ui/core/Divider";

import { AuthContext } from '../../providers/AuthProvider'
import Alerts from '../alerts'
import { AlertProps } from '../alerts/Alerts'
import { CSSDebugger } from "../css-debugger"
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import MainMenu from "./MainMenu";
import { UserMenu, UserMenuMobile } from './UserMenu';

const drawerWidth = 240;

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
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
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
  const { user } = useContext(AuthContext)
  const showDebugger = typeof window !== 'undefined' && !!window.location.href.includes('localhost')
  const classes = useStyles()
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Hidden xsDown>
            <Img loading="eager" fixed={data.file.childImageSharp.fixed} placeholderStyle={{ visibility: "hidden" }} />
          </Hidden>
          <Typography variant={'h6'} className={classes.title}>Pandemic Unemployment Assistance</Typography>
          <Hidden mdDown>
            {user?.token &&
              <UserMenu />
            }
          </Hidden>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden lgUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <UserMenuMobile />
            <Divider />
            <MainMenu />
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Toolbar />
            <MainMenu />
          </Drawer>
        </Hidden>
      </nav>
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
