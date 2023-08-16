import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  BarChart,
  DesktopWindows,
  Book,
  Settings,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    backgroundColor: '#092963',
    '&.active': {
      background: 'linear-gradient(-90deg, rgba(0,212,255,0.0844712885154062) 0%, rgba(228,226,255,0.3) 50%, rgba(168,168,238,0.6) 100%)',
    },
  },
  listItemIcon: {
    color: '#c7c7c7',
    '&.active': {
      color: '#092963',
    },
  },
  listItemText: {
    color: '#c7c7c7',
    '&.active': {
      color: '#092963',
    },
  },
}));

const SideNav = () => {
  const classes = useStyles();
  const [activeNavItem, setActiveNavItem] = useState('');

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  return (
    <nav style={{backgroundColor: '#092963'}} className='rounded-2xl'>
      <List>
        <ListItem
          button
          component={Link}
          to="/home/usage"
          className={`rounded-2xl ${classes.listItem} ${
            activeNavItem === 'usage' ? 'active' : ''
          }`}
          onClick={() => handleNavItemClick('usage')}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <BarChart />
          </ListItemIcon>
          <ListItemText
            primary="Usage"
            className={`${classes.listItemText} ${
              activeNavItem === 'usage' ? 'active' : ''
            }`}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/home/project"
          className={`${classes.listItem} ${
            activeNavItem === 'project' ? 'active' : ''
          }`}
          onClick={() => handleNavItemClick('project')}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DesktopWindows />
          </ListItemIcon>
          <ListItemText
            primary="Project"
            className={`${classes.listItemText} ${
              activeNavItem === 'project' ? 'active' : ''
            }`}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/home/tutorial"
          className={`${classes.listItem} ${
            activeNavItem === 'tutorial' ? 'active' : ''
          }`}
          onClick={() => handleNavItemClick('tutorial')}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <Book />
          </ListItemIcon>
          <ListItemText
            primary="Tutorial"
            className={`${classes.listItemText} ${
              activeNavItem === 'tutorial' ? 'active' : ''
            }`}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/home/settings"
          className={`${classes.listItem} ${
            activeNavItem === 'settings' ? 'active' : ''
          }`}
          onClick={() => handleNavItemClick('settings')}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <Settings />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            className={`${classes.listItemText} ${
              activeNavItem === 'settings' ? 'active' : ''
            }`}
          />
        </ListItem>
      </List>
    </nav>
  );
};

export default SideNav;
