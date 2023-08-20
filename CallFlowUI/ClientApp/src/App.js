import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './output.css';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { PrimeReactProvider } from 'primereact/api';
//theme
import "primereact/resources/themes/lara-light-blue/theme.css";     
//core
import "primereact/resources/primereact.min.css";    
import 'primeicons/primeicons.css';

        
const App = () => {


  return (
    <PrimeReactProvider>
    <Provider store={store}>
        <BrowserRouter>
          <AppRoutes></AppRoutes>
        </BrowserRouter>
    </Provider>
    </PrimeReactProvider>
  );

}

export default App
