import React from 'react';
import { ListGroup, Toast, Badge, Container, Col, Row } from 'react-bootstrap';

const TodoList = (props) => {

  let itemStatus = 'Pending';

  const handleStatus = (item) => {
    if(item.complete === true) {
      itemStatus = 'Complete';
      return 'success';
    }
    itemStatus = 'Pending';
    return 'danger';
  };
  // <span onClick={() => props.handleDelete(item._id)}>Delete Me</span>
  //         <span></span>
  
  return (
    <ListGroup as="ul" variant="flush">
      {props.list.map(item => (
        <Toast as="li" 
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        
          
          onClose={() => props.handleDelete(item._id)}>
          
          <Toast.Header>
            <Container fluid>
              <Row>
                <Col lg="auto">

                  <Badge pill variant={handleStatus(item)} onClick={() => props.handleComplete(item._id)}>{itemStatus}</Badge>{' '}
                </Col>
                <Col lg="auto">
                  <h4>
                    {item.assignee}
                  </h4>
                </Col>

              </Row>
            </Container>
          </Toast.Header>
          <Toast.Body>
            <Container fluid>
              <Row>
                <section className="itemInfo">
                  <Col>
                    <h4>
                      {item.text}
                    </h4>
                  </Col>
                  <Col lg="auto">
                    <p>
                      Difficulty: {item.difficulty}
                    </p>
                  </Col>
                </section>
              </Row>
            </Container>    
          </Toast.Body>    
        </Toast>
      ))}
    </ListGroup>
  );

};



export default TodoList;
