import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { manualLogin } from '../actions/users';

class Login extends Component {
  constructor(props) {
    super(props);
    this._onLoginSubmit = this._onLoginSubmit.bind(this);
  }

  _onLoginSubmit() {
    const { dispatch } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(manualLogin({
      email: email,
      password: password
    }));
  }

  render() {
    const { authenticated, isWaiting } = this.props.user;
    if (authenticated) {
      return (
        <h1>You are logged in amigo</h1>
      );
    }

    if (isWaiting) {
      return (
        <h1>Waiting ...</h1>
      );
    }

    return (
      <div>
        <h1>Email Login Demo</h1>
        <fieldset>
            <input
              type="email"
              ref="email"
              placeholder="email" />
            <input
              type="password"
              ref="password"
              placeholder="password" />
            <button
              onClick={this._onLoginSubmit}>Login</button>
            <p>Hint: email: example@ninja.com password: ninja</p>
        </fieldset>
        <h1>Google Login Demo</h1>
        <fieldset>
          <a
            href="/auth/google">Login with Google</a>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Login);
