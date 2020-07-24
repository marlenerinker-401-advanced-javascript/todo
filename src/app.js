import React from 'react';
import { Nav, Navbar}  from 'react-bootstrap';

import ToDo from './components/todo/todo.js';
import SettingsProvider from './context/settings.js';
import Login from './components/auth/login.js';
import LoginContext from './context/auth-context.js';


const App = () => {
  return (
    <>
      <Navbar bg="primary" variant="light">
        <Nav.Link href="/">Home</Nav.Link>
      </Navbar>
      <LoginContext>
        <Login />
      <SettingsProvider> 
        <ToDo />
      </SettingsProvider>
      </LoginContext>
    </>
  );
};



export default  App;

