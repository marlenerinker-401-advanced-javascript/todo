import React, { useState, useEffect, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import {Container, Row, Col, Alert } from 'react-bootstrap';
import Auth from '../auth/auth.js';




import './todo.scss';
import axios from 'axios';
import { LoginContext } from '../../context/auth-context.js';
import cookie from 'react-cookies';

const If = props => {
  return props.condition ? props.children : null;
};


const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const context = useContext(LoginContext);
  
  
  
  
  
  const [list, setList] =useState([]);
  const [count, setCount] =useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  
  
  const addItem = (item) => {
    
    if (context.user.capabilities.includes('create')){
    
      console.log(context.user.capabilities.includes('create'));
      item.due = new Date();
      console.log(JSON.stringify(item));
      axios( {
        url: todoAPI,
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(item),
      })
        .then(response => response.data)
        .then(savedItem => {
          setList([...list, savedItem]);
        })
        .catch(console.error);
    } else {
      console.error('not authorized');
      setMessage('You\'re not allowed to add items');
      setShowAlert(true);
    }
    
    
  };

  const toggleComplete = (id, displayList) => {
    if (context.user.capabilities.includes('update')){

      let item = displayList.filter(i => i._id === id)[0] || {};

      if (item._id) {

        item.complete = !item.complete;

        let apiUrl = `${todoAPI}/${id}`;

        axios( {
          url: apiUrl,
          method: 'put',
          mode: 'cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(item),
        })
          .then(response => response.data)
          .then(savedItem => {
            setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
          })
          .catch(console.error);
      }
    }else {
      console.error('not authorized');
      setMessage('You\'re not allowed to update items');
      setShowAlert(true);
    }

  };

  const deleteItem = (id, displayList) => {
    if (context.user.capabilities.includes('delete')){

      let item = displayList.filter(i => i._id === id)[0] || {};

      if (item._id) {


        let apiUrl = `${todoAPI}/${id}`;

        axios( {
          url: apiUrl,
          method: 'delete',
          mode: 'cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(item),
        })
       
          .then(response => {            
            getTodoItems();            
          })
          .catch(console.error);
      }
    }else {
      console.error('not authorized');
      setMessage('You\'re not allowed to delete items');
      setShowAlert(true);
    }

  };

  const getTodoItems = () => {
    axios({
      url: todoAPI,
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.data)
      .then(data => setList(data.results))
      .catch(console.error);
  };

  useEffect(getTodoItems, []);

  useEffect(getTodoItems, [context.loggedIn]);

  useEffect(() => {
    let number = list.filter(item => !item.complete).length;
    setCount(number);    

  }, [list]);

  //trying to figure out creating a session with cookie

  // useEffect(() => {
  //   if(context.loggedIn === true){
  //     const cookieToken = cookie.load('auth');
  //     const user = cookieToken || {};
  //     console.log('this is the cookieToken: ', cookieToken);
  //     context.setSession(user);
  //   }
  // });

   

  return (
    <>
      <Auth capability="read">
        <Container >
          <If condition={showAlert === true}> 
            <Row >
              <Alert class="alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>{message}</Alert.Heading>
              </Alert>
            </Row>
          </If>
          <Row >
            <section className="count-message">
              <h2>
            There are {count} items to complete.
              </h2>
            </section>
          </Row>
        
          <Row>
            <section className="todo">
              <Col>
                <div>
                  <TodoForm handleSubmit={addItem} />
                </div>
              </Col>
              <Col>
                <div>
                  <TodoList
                    list={list}
                    handleComplete={toggleComplete}
                    handleDelete={deleteItem}
                  />
                </div>
              </Col>
            </section>
          </Row>
        </Container>
      </Auth>
    </>
  );
};



export default ToDo;
