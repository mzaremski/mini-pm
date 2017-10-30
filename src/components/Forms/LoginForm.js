import React from 'react';

class LoginForm extends React.Component {
    handleSubmit(e){
        e.preventDefault();
    }
    
    render() {
        return (
            <form className="offset-s3 col s6" onSubmit={this.handleSubmit}>
             <div className="row">
               <div className="input-field col s12">
                 <input ref="loginRef" name="login" placeholder="" id="login" name="login" type="text" className="validate"></input>
                 <label for="login">Login</label>
               </div>
               <div className="input-field col s12">
                 <input ref="passwordRef" name="password" id="password" type="password" name="password" className="validate"></input>
                 <label for="password">Password</label>
               </div>
             </div>
             <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
            </form>
        );
    }
}

export default LoginForm;
