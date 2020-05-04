import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (_, value) => {
    setValue(value);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  const menuOptions = [
    {
      name: 'Services',
      link: '/services',
    },
    {
      name: 'Custom Software Development',
      link: '/customsoftware',
    },
    {
      name: 'Mobile App Development',
      link: '/mobileapps',
    },
    {
      name: 'Website Development',
      link: '/websites',
    },
  ];

  useEffect(() => {
    const location = window.location.pathname;
    const locationCondition = (path, tabIndex) =>
      location === path && value !== tabIndex;

    const setValueAndIndex = (selectedIndex) => {
      setValue(1);
      setSelectedIndex(selectedIndex);
    };

    if (locationCondition('/', 0)) setValue(0);
    else if (locationCondition('/services', 1)) setValue(1);
    else if (locationCondition('/customsoftware', 1)) setValueAndIndex(1);
    else if (locationCondition('/mobileapps', 1)) setValueAndIndex(2);
    else if (locationCondition('/websites', 1)) setValueAndIndex(3);
    else if (locationCondition('/revolution', 2)) setValue(2);
    else if (locationCondition('/about', 3)) setValue(3);
    else if (locationCondition('/contact', 4)) setValue(4);
    else if (locationCondition('/estimate', 5)) setValue(5);
  }, [value]);

  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor='primary'
      >
        <Tab className={classes.tab} component={Link} to='/' label='Home' />
        <Tab
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={anchorEl ? 'true' : undefined}
          className={classes.tab}
          component={Link}
          onMouseOver={(e) => handleClick(e)}
          to='/services'
          label='Services'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/revolution'
          label='The Revolution'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/about'
          label='About Us'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/contact'
          label='Contanct Us'
        />
      </Tabs>
      <Button variant='contained' color='secondary' className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
      >
        {menuOptions.map(({ name, link }, idx) => (
          <MenuItem
            key={idx}
            onClick={(e) => {
              handleMenuItemClick(e, idx);
              setValue(1);
              handleClose(e);
            }}
            selected={idx === selectedIndex && value === 1}
            component={Link}
            to={link}
            classes={{ root: classes.menuItem }}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              to='/'
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img className={classes.logo} src={logo} alt='company logo' />
            </Button>
            {matches ? null : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
