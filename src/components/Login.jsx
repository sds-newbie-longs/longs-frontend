import React, { useState } from 'react';

import 'styles/Login.scss';
import Logo from 'assets/MainLogo.svg';
import { useNavigate } from 'react-router';

const Login = () => {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const onChange = e => {
    setId(e.target.value);
  };

  const onClick = () => {
    // setId('');
    navigate('/');
  };

  const buttonClassName = e => {
    if (id.length > 0) {
      return 'button-click';
    }
    return 'button-nor';
  };

  return (
    <div className={'login-root'}>
      <div className={'login-container'}>
        <img src={Logo} />
        <p>우리를 위한 공유 플랫폼 롱스</p>
        <input type="text" placeholder="Insert ID" value={id} onChange={onChange} />
        <button className={buttonClassName()} type="submit" onClick={onClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
