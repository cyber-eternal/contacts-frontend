import React from 'react';
import { Switch } from 'react-router-dom';

import SubRouting from './components/Routes/SubRouting';
import { routesConfig } from './config/routesConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  return (
    <div className="container">
      <Switch>
        {routesConfig.map((route, i) => (
          <SubRouting key={i} {...route} />
        ))}
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
