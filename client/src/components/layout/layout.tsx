import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid"
import Hidden from "@material-ui/core/Hidden";
import IconButton from '@material-ui/core/IconButton';
import { Theme, createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar"
import Typography from '@material-ui/core/Typography'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from '@material-ui/icons/Menu';
import { graphql, navigate, useStaticQuery } from 'gatsby'
import Img from "gatsby-image"
import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import useVersion from "../../hooks/useVersion"
import { AuthContext } from '../../providers/AuthProvider'
import Alerts from '../alerts'
import { AlertProps } from '../alerts/Alerts'
import Backdrop from '../backdrop'
import { CSSDebugger } from '../css-debugger'
import LanguageMenu from "./LanguageMenu";
import MainMenu from "./MainMenu";
import { UserMenu, UserMenuMobile } from './UserMenu';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      cursor: 'pointer',
      [theme.breakpoints.down('xs')]: {
        fontSize: 'small',
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    image: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center'
    }
  }),
);

const Layout = (props: { children: React.ReactNode, alert?: AlertProps | false }) => {
  useVersion()
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
  const { t } = useTranslation()

  const { user } = useContext(AuthContext)
  const showDebugger = typeof window !== 'undefined' && !!window.location.href.includes('localhost')
  const classes = useStyles()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const onHomeClick = () => navigate('/')

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {isMobile && user?.token &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              data-testid={'menu-icon'}
            >
              <MenuIcon />
            </IconButton>
          }
          <Hidden smDown>
            <div onClick={onHomeClick} className={classes.image}>
              <Img loading="eager" fixed={data?.file?.childImageSharp?.fixed} placeholderStyle={{ visibility: "hidden" }} />
            </div>
          </Hidden>
          <Typography variant={'h6'} className={classes.title} onClick={onHomeClick}>{t('layout.title')}</Typography>
          <div style={{ flex: '1 1 auto' }} />
          <LanguageMenu />
          <Hidden mdDown>
            {user?.token &&
              <UserMenu />
            }
          </Hidden>
        </Toolbar>
      </AppBar>

      {user?.token && isMobile &&
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={open}
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
      }

      {user?.token && !isMobile &&
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Toolbar />
          <MainMenu />
        </Drawer>
      }
      <Container>
        {showDebugger &&
          <CSSDebugger />
        }
        <Backdrop />
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
    </div>
  )
}

export { Layout };
