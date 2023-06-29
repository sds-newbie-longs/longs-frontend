import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import check from 'utils/common/SessionChecker';

import 'styles/Upload.scss';
import Dropzone from 'components/Dropzone';
import CloseBtn from 'assets/CloseBtn.png';
import VideoTasks from 'utils/axios/video/AxiosVideoTasks';

// import VideoTasks from 'utils/axios/video/AxiosVideoTasks';

const Upload = props => {
  const navigate = useNavigate();
  const [isUpload, setIsUpload] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [groupId, setGroupId] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [boardId, setBoardId] = useState('');

  const { state } = useLocation();

  useEffect(() => {
    check().catch(() => navigate('/'));
    if (state === null) {
      navigate('/');
    } else {
      setGroupId(state.groupId);
      setGroupName(state.groupName);
    }
  }, []);

  const ClickForUpload = () => {
    if (isUpload && title.length > 0) {
      VideoTasks.getUploadBoardPromise(groupId, boardId, title, description)
        .then(res => {
          if (res.status === 200) {
            props.handleUploadCode(200);
            console.log('good....200 ok');
            VideoTasks.getVideoHighScalePromise(boardId).catch(err => console.log(err));
          }
        })
        .catch(error => {
          props.handleUploadCode(400);
          console.log(error.code);
        });
      const notify = () => toast('업로드가 완료되었습니다.');
      notify();
      setTimeout(() => navigate('/'), 1000);
    } else {
      if (title.length === 0) {
        const noTitle = () => toast.error('제목을 입력해 주세요.');
        noTitle();
      }
      if (!isUpload) {
        const notUpload = () => toast.error('아직 업로드 중입니다.');
        notUpload();
      }
    }
  };

  const TitleChange = e => {
    setTitle(e.target.value);
  };

  const DescriptionChange = e => {
    setDescription(e.target.value);
    console.log(boardId);
  };

  const buttonClassName = () => {
    if (isUpload && title.length > 0) {
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
        <Dropzone setIsUpload={setIsUpload} setBoardId={setBoardId} groupId={state.groupId} />
        <div className={'text-container'}>
          <div className={'text-group'}>
            <p className={'group-ment1'}>Group</p>
            <p className={'group-ment2'}>{groupName}</p>
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
  handleOnUesrInfo: PropTypes.func,
  handleUploadCode: PropTypes.func,
};
export default Upload;
