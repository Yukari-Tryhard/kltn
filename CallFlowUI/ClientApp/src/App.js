import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './store/store';
import { Provider } from 'react-redux';

// React Query
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

// Charka UI
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';

// Decoration
import { ProSidebarProvider } from 'react-pro-sidebar';

import './output.css';

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
        </QueryClientProvider>
    );
};

export default App;
