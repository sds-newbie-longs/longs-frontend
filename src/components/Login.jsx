import React, { useState } from 'react';

import 'styles/Login.scss';
import Logo from 'assets/MainLogo.svg';
import { useNavigate } from 'react-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const onChange = e => {
    setUsername(e.target.value);
  };

  const onClick = () => {
    // todo: 서버 api 공유 되면 대체
    /* Tasks.getSignInPromise(username).then(res => {
      const code = res.data.code;
      if (code === BusinessCode.LOGIN_SUCCESS) {
        Tasks.getMemberIdPromise(username).then(res => {
          const id = res.data;
          navigate('/');
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('id', id);
        });
      }
    }); */
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('id', 1);
    navigate('/');
  };

  const buttonClassName = e => {
    if (username.length > 0) {
      return 'button-click';
    }
    return 'button-nor';
  };

  return (
    <div className={'login-root'}>
      <div className={'login-container'}>
        <img src={Logo} />
        <p>우리를 위한 공유 플랫폼 롱스</p>
        <input type="text" placeholder="Insert ID" value={username} onChange={onChange} />
        <button className={buttonClassName()} type="submit" onClick={onClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
