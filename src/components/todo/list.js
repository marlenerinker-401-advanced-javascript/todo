import React, { useEffect, useState, useContext } from 'react';
import { ListGroup, Toast, Badge, Container, Col, Row, Button } from 'react-bootstrap';
import { SettingsContext } from '../../context/settings.js';
import Pagination from 'react-bootstrap-4-pagination';



const TodoList = (props) => {

  const context = useContext(SettingsContext);

  
  
  const [currentPage, setPage] = useState(1);
  const [displayList, setDisplay] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  
  
  let totalPages = Math.floor(props.list.length/context.settings[0].pageMax);
  
  let paginationConfig = {
    totalPages: totalPages,
    currentPage: currentPage,
    showMax: totalPages,
    size: 'lg',
    prevNext: false,
    onClick: function (page) {
      
      cutList(props.list, page);
      setPage(page);
    },
  };
  
  function cutList(list, page) {
    let startIndex = 0;

    let tempList = list;
    let filteredList = [];
    
    if(context.settings[0].showCompleted === false){
      console.log('in the if statement');
      for(let j = 0; j < tempList.length; j++) {
        if(tempList[j].complete === false) {
          filteredList.push(tempList[j]);
        }
      }
      tempList = filteredList;

    }
    
    if(page !== 1) {
      startIndex = (page * context.settings[0].pageMax)-1;
    }
    console.log(startIndex);
    let pageList = [];
    for(let i = startIndex; i< (startIndex + context.settings[0].pageMax); i++) {
      if(tempList[i]){        
        pageList.push(tempList[i]);     
      }
    }
    
    if (pageList !== []){
      setDisplay(pageList);
    }
    
    return(pageList);
    
    
  }

  useEffect(() => {
    setTimeout(() => {
      if(firstLoad === true) {
        cutList(props.list, 1);
        setPage(1);
        setFirstLoad(false);
      }
    }, 2000);
  });
  
  
  
  let itemStatus = 'Pending';
  
  const handleStatus = (item) => {
    if(item.complete === true) {
      itemStatus = 'Complete';
      return 'success';
    }
    itemStatus = 'Pending';
    return 'danger';
  };

  

  

  
  
  
  return (
    <>
      <ListGroup as="ul" variant="flush">
        {displayList.map(item => (
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
      <div id = "page-numbers">
        <Pagination {...paginationConfig} />
      </div>
    </>
  );

};



export default TodoList;
