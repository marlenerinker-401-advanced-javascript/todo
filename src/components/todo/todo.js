import React, { useState, useEffect, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import {Container, Row, Col } from 'react-bootstrap';
import Pagination from 'react-bootstrap-4-pagination';



import './todo.scss';
import axios from 'axios';





const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {

 

  const [list, setList] =useState([]);
  const [count, setCount] =useState(0);
  

  const addItem = (item) => {
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
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

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

  };

  const deleteItem = id => {

    let item = list.filter(i => i._id === id)[0] || {};

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

  useEffect(() => {
    let number = list.filter(item => !item.complete).length;
    setCount(number);    

  }, [list]);

   

  return (
    <>
      <Container fluid>
        <Row fluid>
          <section className="count-message">
            <h2>
            There are {count} items to complete. <br></br>Click page number if you don't see any.
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
    </>
  );
};



export default ToDo;
