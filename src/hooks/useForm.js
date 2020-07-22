import { useState } from 'react';


const useForm = (callback) => {

  
  const [values, setValues] = useState({});



  const handleSubmit = (event) => {
    if (event){
      event.preventDefault();
      event.target.reset();      
    } 
    callback(values);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  
  return [
    values,
    handleChange,
    handleSubmit,
  ];
};

export default useForm;