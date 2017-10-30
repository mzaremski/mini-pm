import React from 'react';
import LoginForm from './../Forms/LoginForm';


class Login extends React.Component {
  render() {
    return (
        <div>
            <div className="row">
                <h3>LOGIN PAGE</h3>
                <LoginForm></LoginForm>
            </div>
        </div>
    );
  }
}

export default Login;
