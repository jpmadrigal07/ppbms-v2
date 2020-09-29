import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import { AppBar,
        Toolbar,
        Typography, 
        Button, 
        IconButton,
        Drawer,
        List} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import "./Navbar.css";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    
  },
  
}));

const Navbar = ({navbarTitle}) => {

  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleMenuClick = (pageURL) => {
    setMobileOpen(!mobileOpen);
    history.push(pageURL);
  };

  // menu list for drawer
  const menuItem = [
        {
          title: 'Home',
          pageURL: '/'
        },
        {
          title: 'About',
          pageURL: '/about'
        },
        {
          title: 'Contact',
          pageURL: '/contact'
        },
        {
          title: 'Plan',
          pageURL: '/plan'
        },
        {
          title: 'Register',
          pageURL: '/register'
        },    
  ]

  // drawer will show on mobile view
  const drawer = (
       <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleMenuClick}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {menuItem.map(menuItem => {
              const {title, pageURL} = menuItem;
              return (
                <div>
                  <Button onClick={() => handleMenuClick(pageURL)} fullWidth>{title}</Button>
                </div>
              )
            })}
          </List>
      </Drawer>
    );

    // buttonMenu will show on wide or large screen
  const buttonMenu = (
    <Typography>
          <Button
            onClick={() => history.push("/")}
            color="inherit"
          >
            Home
          </Button>
          <Button
            onClick={() => history.push("/about")}
            color="inherit"
          >
            About
          </Button>
          <Button
            onClick={() => history.push("/contact")}
            color="inherit"
          >
            Contact
          </Button>
          <Button
            onClick={() => history.push("/plan")}
            color="inherit"
          >
            Plan
          </Button>
          <Button
            onClick={() => history.push("/register")}
            color="inherit"
          >
            Register
          </Button>
    </Typography>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
          <AppBar position="fixed" >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleMenuClick}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" className="title">
                  {navbarTitle}
              </Typography>

              <div>
                  {isMobile ? drawer : buttonMenu} 
              </div>

            </Toolbar>
          </AppBar>
    </div>
  );
}

export default Navbar;
