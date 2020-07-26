import React from 'react';
import { LoginContext } from '../../context/auth-context.js';

const If = props => {
  return props.condition ? props.children : null;
};

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', role: '', showSignup: false };
  }
  

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
  };

  handleSignup = e => {
    e.preventDefault();
    this.context.signup(this.state.username, this.state.password, this.state.role);
    
  }

  setSignup = e => {
    e.preventDefault();
    this.setState({showSignup: !this.state.showSignup})
  }

  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out</button>
        </If>

        <If condition={!this.context.loggedIn && !this.state.showSignup}>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="username"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <button>Login</button>
            <p class="pseudo-link" onClick={this.setSignup}>I need to signup</p>
          </form>
          </If>
          <If condition={!this.context.loggedIn && this.state.showSignup}>
          <form onSubmit={this.handleSignup}>
            <input
              placeholder="username"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input
              placeholder="role"
              name="role"
              onChange={this.handleChange}
            />
            <button>Signup</button>
            <p class="pseudo-link" onClick={this.setSignup}>Back to login</p>
          </form>
        </If>
      </>
    );
  }
}

export default Login;