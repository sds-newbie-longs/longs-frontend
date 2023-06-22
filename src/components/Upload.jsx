import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

import 'styles/Upload.scss';
import Dropzone from 'components/Dropzone';
import CloseBtn from 'assets/CloseBtn.png';
import Tasks from 'utils/axios/member/AxiosMemberTasks';
// import VideoTasks from 'utils/axios/video/AxiosVideoTasks';

const Upload = props => {
  const navigate = useNavigate();
  const [isUpload, setIsUpload] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesscription] = useState('');
  const [groupId, setGroupId] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [uuid, setUuid] = useState('');

  const { state } = useLocation();

  const setUesrInfo = data => {
    props.handleOnUesrInfo({ userName: data.username, userId: data.id });
  };

  useEffect(() => {
    if (state === null) {
      navigate('/');
    } else {
      setGroupId(state.groupId);
      setGroupName(state.groupName);
    }

    Tasks.getMemberIdPromise()
      .then(res => {
        const data = res.data;
        console.log(data);
        setUesrInfo(data);
      })
      .catch(res => {
        navigate('/login');
      });
  }, []);

  const TitleChange = e => {
    setTitle(e.target.value);
  };

  const DescriptionChange = e => {
    setDesscription(e.target.value);
    console.log(uuid);
  };

  const ClickForUpload = e => {
    // call api later...
    // VideoTasks.getUploadBoardPromise(groupId, uuid, title, description).then(res => {
    //   console.log(groupId, uuid, title, description);
    //   navigate('/');
    // });
    setTitle('');
    setDesscription('');
    setIsUpload(false);
    // test
    const notify = () => toast.success('동영상이 성공적으로 업로드 되었습니다.');
    notify();
    setTimeout(() => navigate('/'), 2000);
  };

  const buttonClassName = e => {
    if (isUpload && title.length > 0) {
      return 'button-click';
    }
    return 'button-nor';
  };
  const ClickToGoMain = () => {
    navigator('/');
    console.log('go to main...');
  };

  return (
    <div className={'upload-root'}>
      <div className={'upload-container'}>
        <img className={'close-button'} src={CloseBtn} onClick={ClickToGoMain} />
        <p className={'upload-ment'}>Upload Files</p>
        <Dropzone setIsUpload={setIsUpload} setUuid={setUuid} />
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
  handleOnUesrInfo: PropTypes.func,
};
export default Upload;
