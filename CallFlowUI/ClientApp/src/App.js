// Core
import React from 'react';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { store } from './store/store';

// React Query
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

// Charka UI
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';

// Decoration
import { ProSidebarProvider } from 'react-pro-sidebar';
import { PrimeReactProvider } from 'primereact/api';
import './output.css';

// Theme
import 'primereact/resources/themes/lara-light-blue/theme.css';

// PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {
    const { ToastContainer } = createStandaloneToast();
    const theme = extendTheme({
        colors: {
            link: '#4374e3',
            mainBg: '#d7e2e978',
            primary1: '#3182CE',
            primary2: '#002664',
            secondary1: '#DCA11D',
            secondary2: '#E6F4F1'
        }
    });

    // Create a client
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <PrimeReactProvider>
                <Provider store={store}>
                    <ChakraProvider theme={theme}>
                        <ProSidebarProvider>
                            <DndProvider backend={HTML5Backend}>
                                <BrowserRouter>
                                    <ToastContainer />
                                    <AppRoutes></AppRoutes>
                                </BrowserRouter>
                            </DndProvider>
                        </ProSidebarProvider>
                    </ChakraProvider>
                </Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </PrimeReactProvider>
        </QueryClientProvider>
    );
};

export default App;
