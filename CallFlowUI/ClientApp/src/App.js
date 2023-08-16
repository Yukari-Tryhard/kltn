import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './output.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './store/store'
import { Provider } from 'react-redux'

const App = () => {


  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <AppRoutes></AppRoutes>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  );

}

export default App
