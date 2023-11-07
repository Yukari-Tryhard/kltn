// Core
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// React Router
import { Provider } from 'react-redux';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { store } from './modules/store/Store';

// React Query
import { QueryClient, QueryClientProvider } from 'react-query';

// Charka UI
import { ChakraProvider } from '@chakra-ui/react';

// Components
import LoadingSpinner from './common/components/LoadingSpinner';

// App
import App from './App';
import './styles/custom.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
				<ChakraProvider>
					<ProSidebarProvider>
						<App />
					</ProSidebarProvider>
				</ChakraProvider>
			</Provider>
		</QueryClientProvider>
	</Suspense>
	// </React.StrictMode>
);
