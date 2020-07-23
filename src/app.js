import React from 'react';
import { Nav, Navbar}  from 'react-bootstrap';

import ToDo from './components/todo/todo.js';
import SettingsProvider from './context/settings.js';


const App = () => {
  return (
    <>
      <Navbar bg="primary" variant="light">
        <Nav.Link href="/">Home</Nav.Link>
      </Navbar>
      <SettingsProvider>
        <ToDo />
      </SettingsProvider>
    </>
  );
};



export default  App;

