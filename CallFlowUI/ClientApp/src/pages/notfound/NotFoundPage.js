import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  icon: {
    fontSize: '6rem',
    color: theme.palette.error.main,
  },
  heading: {
    margin: theme.spacing(2),
    fontWeight: 'bold',
  },
  message: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ErrorOutline className={classes.icon} />
      <Typography variant="h4" className={classes.heading}>
        Page Not Found
      </Typography>
      <Typography variant="body1" className={classes.message}>
        The requested page could not be found.
      </Typography>
      <Button component={Link} to="/home/usage" variant="contained" color="primary">
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
