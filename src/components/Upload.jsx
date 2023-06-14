import React, { useState } from 'react';

import 'styles/Upload.scss';
import Dropzone from 'components/Dropzone';
import CloseBtn from 'assets/CloseBtn.png';

const Upload = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesscription] = useState('');

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
          <button className={'cancle-btn'}>cancle</button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
