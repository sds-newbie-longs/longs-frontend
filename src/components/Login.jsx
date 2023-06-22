import React, { useState } from 'react';

import 'styles/Login.scss';
import Logo from 'assets/MainLogo.svg';
import { useNavigate } from 'react-router';
import Tasks from 'utils/axios/member/AxiosMemberTasks';
import BusinessCode from 'utils/common/BuisnessCode';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const onChange = e => {
    setUsername(e.target.value);
  };

  const onClick = () => {
    Tasks.getSignInPromise(username).then(res => {
      const code = res.data.code;
      if (code === BusinessCode.LOGIN_SUCCESS) {
        navigate('/');
      }
    });
  };

  const buttonClassName = () => {
    if (username.length > 0) {
      return 'button-click';
    }
    return 'button-nor';
  };

  const onKeyDown = evt => {
    if (evt.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div className={'login-root'}>
      <div className={'login-container'}>
        <img src={Logo} alt={'Longs Icon'} />
        <p>우리를 위한 공유 플랫폼 롱스</p>
        <input
          type="text"
          placeholder="Insert ID"
          value={username}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button className={buttonClassName()} type="submit" onClick={onClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
