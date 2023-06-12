import React from 'react';

import 'styles/login.scss';
import Logo from 'assets/Logo.png';

const Login = () => {
  const loginHandler = () => {
    console.log('click..');
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src={Logo} />
        <p>우리를 위한 공유 플랫폼 롱스</p>
        <input type="text" placeholder="Insert ID" />
        <button type="submit" onClick={loginHandler}>
          {' '}
          Login{' '}
        </button>
      </div>
    </div>
  );
};

export default Login;
