import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import useForm from '../../hooks/useForm.js';

const TodoForm = (props) => {


  
  const [item, handleInputChange, handleSubmit] = useForm(props.handleSubmit);
  



  return (
    <>
      <h3>Add Item</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>To Do Item</span>
          <input
            name="text"
            placeholder="Add To Do List Item"
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Difficulty Rating</span>
          <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
        </label>
        <label>
          <span>Assigned To</span>
          <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
        </label>
        <Button type="submit">Add Item</Button>
      </form>
    </>
  );


};



export default TodoForm;
