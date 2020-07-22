import { useState useEffect } from 'react';
import axios from 'axios';


const useAjax = (callback) => {
  //   Using this hook in your component should make the calls to the server
  // This hook should:
  // Accept the URL to the API server, the REST method, and (when relevant) the BODY (JSON) of the request
  // Handle CORS Settings, Content-Type, Headers and possibly authentication
  // You should use axios to perform the actual AJAX calls
  
  const [values, setValues] = useState({});

  //this needs to be wrapped in the useEffect maybe?? - one function for each function in todo.js??

  //or do we just do one function that handles the axios call and gets put into the addItem, toggleComplete, etc??

  useEffect(addItem = async (item) => {
    item.due = new Date();
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
        setValues([...values, savedItem]);
      })
}, [props??]); //needs to run when the submit button is pushed and you get back props??

  

  

  
  return [
    values,
    addItem,
  ];
};

export default useAjax;