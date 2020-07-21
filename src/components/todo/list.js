import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const TodoList = (props) => {

  const handleStatus = (item) => {
    if(item.complete === true) {
      return 'success';
    }
    return 'danger';
  };
  

  return (
    <ListGroup as="ul" variant="flush">
      {props.list.map(item => (
        <ListGroup.Item as="li" action variant={handleStatus(item)}
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <span onClick={() => props.handleComplete(item._id)}>
            {item.text} - {item.assignee}
          </span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

};



export default TodoList;
