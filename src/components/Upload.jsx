import React, { useState } from 'react';

import 'styles/Upload.scss';
import Dropzone from 'components/Dropzone';
import CloseBtn from 'assets/CloseBtn.png';
import { useNavigate } from 'react-router';

const Upload = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesscription] = useState('');
  const [uuid, setUuid] = useState('');
  const navigator = useNavigate();

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
      console.log(uuid);
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
            <p className={'group-ment2'}>knox SRE</p>
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
          <button className={'cancle-btn'} onClick={ClickToGoMain}>
            cancle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
