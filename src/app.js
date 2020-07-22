import React from 'react';
import { Nav, Navbar}  from 'react-bootstrap';

import ToDo from './components/todo/todo.js';


const App = () => {
  return (
    <>
      <Navbar bg="primary" variant="light">
        <Nav.Link href="/">Home</Nav.Link>
      </Navbar>
      <ToDo />
    </>
  );
};



export default  App;

