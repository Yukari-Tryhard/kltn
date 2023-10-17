// Core
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// React Router
import { Provider } from 'react-redux';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { PrimeReactProvider } from 'primereact/api';
import { store } from './store/Store';

// React Query
import { QueryClient, QueryClientProvider } from 'react-query';

// Charka UI
import { ChakraProvider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';

// PrimeReact
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Suspense
import LoadingSpinner from './common/components/LoadingSpinner';

// App
import App from './App';
import './styles/custom.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

const { ToastContainer } = createStandaloneToast();

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

root.render(
	// <React.StrictMode>
	<Suspense fallback={<LoadingSpinner />}>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PrimeReactProvider>
					<ChakraProvider>
						<ProSidebarProvider>
							<ToastContainer />
							<App />
						</ProSidebarProvider>
					</ChakraProvider>
				</PrimeReactProvider>
			</Provider>
		</QueryClientProvider>
	</Suspense>
	// </React.StrictMode>
);
