import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { themeChange } from 'theme-change';

import { createStandaloneToast } from '@chakra-ui/toast';

import ScrollToTop from './common/components/ScrollToTop';
import { GlobalHistory } from './common/components/GlobalHistory';
import AppRoutes from './routes/AppRoutes';
import './styles/App.css';

const { ToastContainer } = createStandaloneToast();

function App() {
	useEffect(() => {
		// 👆 daisy UI themes initialization
		themeChange(false);
	}, []);

	return (
		<Router>
			<ScrollToTop />
			<ToastContainer />
			<GlobalHistory />
			<AppRoutes />
		</Router>
	);
}

export default App;
