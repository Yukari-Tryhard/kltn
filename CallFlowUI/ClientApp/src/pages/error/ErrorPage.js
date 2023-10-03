import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		padding: theme.spacing(3)
	},
	title: {
		marginBottom: theme.spacing(2)
	},
	button: {
		marginTop: theme.spacing(2)
	}
}));

const ErrorPage = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h4" className={classes.title}>
				Oops! Something went wrong.
			</Typography>
			<Typography variant="body1">We apologize for the inconvenience. Please try again later.</Typography>
			<Button variant="contained" color="primary" className={classes.button} onClick={() => window.location.reload()}>
				Reload Page
			</Button>
		</div>
	);
};

export default ErrorPage;
