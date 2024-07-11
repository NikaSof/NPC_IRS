import React, {useContext, useEffect, useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import './App.css';
import {Context} from "./index";
import NavBar from './components/NavBar';

const App = () => {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
