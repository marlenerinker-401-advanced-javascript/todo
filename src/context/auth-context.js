import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';






const API = process.env.REACT_APP_API;

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
      user: {},
    };
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
      token = JSON.parse(token);
      console.log(token);
      let user = jwt.verify(token.token, process.env.REACT_APP_SECRET);
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
    this.setLoginState(false, null, {});
  };

  setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    this.setState({ token, loggedIn, user });
  };

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;