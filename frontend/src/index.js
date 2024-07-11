import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";

export const Context = createContext(null);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Context.Provider value={{ user: new UserStore() }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);