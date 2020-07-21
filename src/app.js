import React from 'react';
import { Nav, Navbar}  from 'react-bootstrap';

import ToDo from './components/todo/todo.js';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="primary" variant="light">
          <Nav.Link href="/">Home</Nav.Link>
        </Navbar>
        <ToDo />
      </>
    );
  }
}
