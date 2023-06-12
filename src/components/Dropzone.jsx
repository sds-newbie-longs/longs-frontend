/* eslint-disable react/prop-types */
import React from 'react';
import { useDropzone } from 'react-dropzone';

import 'styles/Dropzone.scss';

const Dropzone = props => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    accept: {
      'video/mp4': [],
    },
  });
  const files = acceptedFiles.map(file => <p key={file.path}>{file.path}</p>);

  if (files.length > 0) {
    props.setIsUpload(true);
    return <div className={'drop-container-full'}>{files}</div>;
  }
  return (
    <div className={'drop-container-empty'}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input className={'drop-container-input'} {...getInputProps()} />
        <p className={'drop-ment1'}>Drop your video here !</p>
        <p className={'drop-ment2'}>or click</p>
        <button type="button" onClick={open} />
      </div>
    </div>
  );
};

export default Dropzone;
