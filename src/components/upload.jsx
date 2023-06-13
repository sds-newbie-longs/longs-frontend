import React from 'react';

import 'styles/upload.scss';
import CloseBtn from 'assets/CloseBtn.png';
import AddBtn from 'assets/AddBtn.png';

const upload = () => {
  // Initialize once (at the start of your app).

  const onclick = () => {
    console.log(`click...`);
  };

  return (
    <div className={'upload-root'}>
      <div className={'upload-container'}>
        <img className={'close-button'} src={CloseBtn} />
        <p className={'upload-ment'}>Upload Files</p>
        <div className={'drop-container'}>
          <div className={'drop-box'}>
            <p className={'drop-ment1'}>Drop your video here !</p>
            <p className={'drop-ment2'}>or click</p>
            <img className={'drop-add'} src={AddBtn} onClick={onclick} />
          </div>
        </div>
        <div className={'text-container'}>
          <div className={'text-group'}>
            <p className={'group-ment1'}>Group</p>
            <p className={'group-ment2'}>knox SRE</p>
          </div>
          <div className={'text-title'}>
            <p>Title</p>
            <input type="text" placeholder="Text Title"></input>
          </div>
          <div className={'text-description'}>
            <p>Description</p>
            <textarea placeholder="Text Description"></textarea>
          </div>
        </div>
        <div className={'submit-container'}>
          <button className={'upload-btn'} type="submit">
            Upload File
          </button>
          <p>or</p>
          <button className={'cancle-btn'}>cancle</button>
        </div>
      </div>
    </div>
  );
};

export default upload;
