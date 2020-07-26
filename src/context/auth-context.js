import React, { useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';






const API = process.env.REACT_APP_API || 'https://api-js401.herokuapp.com';

// const API = 'https://api-js401.herokuapp.com'
// const API = 'http://localhost:3030'

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      token: null,
      login: this.login,
      logout: this.logout,
      setSession: this.setSession,
      signup: this.signup,
      user: {},
    };
  }
  //not sure if this works - API was down so couldn't test
  signup = (name, pwd, access) => {
    console.log(name, pwd, access);
    fetch(`${API}/signup`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      body: { username: name, password: pwd, role: access },
    })
    //need to handle this when can actually see it happen - should either log them in or send them to login screen
    .then(response => {console.log(response)})
    .catch(console.error);
  }

  login = (username, password) => {
    console.log(username, password);
    fetch(`${API}/signin`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      }),
    })
      .then(response => response.text())
      .then(token => this.validateToken(token))
      .catch(console.error);
  }

  validateToken = token => {
    try {
      console.log('about to check token', token);
      // if API is 'https://api-js401.herokuapp.com' - uncomment token and let user lines and comment out other let user line below
      token = JSON.parse(token);
      let user = jwt.verify(token.token, process.env.REACT_APP_SECRET);
      // if API is 'http://localhost:3030' - uncomment let user line and comment out lines above
      // let user = jwt.verify(token, process.env.REACT_APP_SECRET);
      console.log(user);
      console.log('all good');
      this.setLoginState(true, token, user);
    }
    catch (e) {
      this.setLoginState(false, null, {});
      console.log('Token Validation Error', e);
    }

  };

  logout = () => {
    cookie.remove('auth');
    this.setLoginState(false, null, {});
  };

  setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    console.log('this is the user in setLoginState: ', user);
    this.setState({ token, loggedIn, user });
  };

  //trying to figure out having a session, not working yet - some related commented out code is in todo.js
  setSession = (props) => {
    console.log(props);
    
    this.setState({user: props});
  }

  
  

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;