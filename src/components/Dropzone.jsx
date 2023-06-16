/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import 'styles/Dropzone.scss';
import AddButton from './common/AddButton';

const Dropzone = props => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    accept: {
      'video/mp4': [],
    },
  });
  const files = acceptedFiles.map(file => <p key={file.path}>{file.path}</p>);

  useEffect(() => {
    if (files.length > 0) {
      props.setIsUpload(true);
    }
  }, [files.length]);

  if (files.length > 0) {
    return <div className={'drop-container-full'}>{files}</div>;
  }
  return (
    <div className={'drop-container-empty'}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input className={'drop-container-input'} {...getInputProps()} />
        <p className={'drop-ment1'}>Drop your video here !</p>
        <p className={'drop-ment2'}>or click</p>
        <div className={'drop-add-button-wrapper'}>
          <AddButton handleClick={open} />
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
