import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import check from 'utils/common/SessionChecker';
import PropTypes from 'prop-types';

import 'styles/Upload.scss';
import Dropzone from 'components/Dropzone';
import CloseBtn from 'assets/CloseBtn.png';
import VideoTasks from 'utils/axios/video/AxiosVideoTasks';
import toast, { Toaster } from 'react-hot-toast';

const Upload = props => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [groupId, setGroupId] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [uuid, setUuid] = useState('');
  const { state } = useLocation();
  const notify = text => toast(text);

  useEffect(() => {
    check().catch(() => navigate('/'));
    if (state === null) {
      navigate('/');
    } else {
      setGroupId(state.groupId);
      setGroupName(state.groupName);
    }
  }, []);

  const TitleChange = e => {
    setTitle(e.target.value);
  };

  const DescriptionChange = e => {
    setDescription(e.target.value);
  };

  const ClickForUpload = () => {
    VideoTasks.getUploadBoardPromise(groupId, uuid, title, description)
      .then(res => {
        if (res.status === 200) {
          console.log('good....200 ok');
        }
      })
      .catch(error => {
        console.log(error.code);
      });
    notify('업로드가 완료되었습니다.');
    setTimeout(() => navigate('/'), 1000);
  };

  const buttonClassName = () => {
    if (uuid && title.length > 0) {
      return 'button-click';
    }
    return 'button-nor';
  };
  const ClickToGoMain = () => {
    navigate('/');
    console.log('go to main...');
  };

  return (
    <div className={'upload-root'}>
      <div className={'upload-container'}>
        <img
          className={'close-button'}
          src={CloseBtn}
          alt={'Close Button'}
          onClick={ClickToGoMain}
        />
        <p className={'upload-ment'}>Upload Files</p>
        <Dropzone setUuid={setUuid} />
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
          <Toaster />
          <p>or</p>
          <button className={'cancle-btn'} onClick={ClickToGoMain}>
            cancle
          </button>
        </div>
      </div>
    </div>
  );
};

Upload.propTypes = {
  setUploadCode: PropTypes.any,
};

export default Upload;
