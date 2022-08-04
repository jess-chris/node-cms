import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { restoreUser } from './components/utils/session';

import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

import Pages from './components/Pages';


import './App.css';

function App() {

  const [loaded, setLoaded] = useState(false);


  useEffect(() => {

    (async () => {

      // await restoreUser();
      setLoaded(true);
    })();

  }, []);



  if (!loaded) return null;



  return (
    <>
    
      <Routes>

        <Route path='/' element={<Pages />} />


        <Route path='/node-cms/login' element={<Auth />} />
        <Route path='/node-cms/dashboard' element={<Dashboard />} />

      </Routes>
    
    
    </>
  );
}

export default App;
