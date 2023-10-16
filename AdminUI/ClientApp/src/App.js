import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { themeChange } from 'theme-change';
import AppRoutes from './routes/AppRoutes';
import './styles/App.css';

function App() {
	useEffect(() => {
		// 👆 daisy UI themes initialization
		themeChange(false);
	}, []);

	return (
		<>
			<Router>
				<AppRoutes />
			</Router>
		</>
	);
}

export default App;
