import React, { useEffect, useState } from 'react';

import 'styles/Upload.scss';
import Dropzone from 'components/Dropzone';
import CloseBtn from 'assets/CloseBtn.png';
import Tasks from 'utils/axios/member/AxiosMemberTasks';
import BusinessCode from 'utils/common/BuisnessCode';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Upload = props => {
  const navigator = useNavigate();
  const [isUpload, setIsUpload] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesscription] = useState('');
  const [groupId, setGroupId] = useState(0);
  const [groupName, setGroupName] = useState('');

  const { state } = useLocation();

  useEffect(() => {
    if (state === null) {
      navigator('/');
    } else {
      setGroupId(state.groupId);
      setGroupName(state.groupName);
    }
    Tasks.getMemberIdPromise().then(res => {
      const code = res.data.code;
      if (code === BusinessCode.INFO_SUCCESS) {
        sessionStorage.setItem('username', res.data.username);
        sessionStorage.setItem('id', res.data.id);
      }
      if (sessionStorage.getItem('id') === null) {
        navigator('/login');
      }
    });
  }, []);

  const TitleChange = e => {
    setTitle(e.target.value);
  };

  const DescriptionChange = e => {
    setDesscription(e.target.value);
  };

  const ClickForUpload = e => {
    // call api later...
    setTitle('');
    setDesscription('');
    setIsUpload(false);
  };

  const buttonClassName = e => {
    if (isUpload && title.length > 0) {
      return 'button-click';
    }
    return 'button-nor';
  };

  return (
    <div className={'upload-root'}>
      <div className={'upload-container'}>
        <img className={'close-button'} src={CloseBtn} />
        <p className={'upload-ment'}>Upload Files</p>
        <Dropzone setIsUpload={setIsUpload} />
        <div className={'text-container'}>
          <div className={'text-group'}>
            <p className={'group-ment1'}>Group</p>
            <p className={'group-ment2'}>
              {groupName}:{groupId}
            </p>
          </div>
          <div className={'text-title'}>
            <p>Title</p>
            <input type="text" placeholder="Text Title" value={title} onChange={TitleChange} />
          </div>
          <div className={'text-description'}>
            <p>Description</p>
            <textarea
              placeholder="Text Description"
              value={description}
              onChange={DescriptionChange}
            ></textarea>
          </div>
        </div>
        <div className={'submit-container'}>
          <button className={buttonClassName()} type="submit" onClick={ClickForUpload}>
            Upload File
          </button>
          <p>or</p>
          <button className={'cancle-btn'}>cancle</button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
