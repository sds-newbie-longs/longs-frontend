import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'styles/Dropzone.scss';
import AddButton from 'components/common/AddButton';
import PropTypes from 'prop-types';
// import { encode } from 'utils/video/VideoEncoder';
import TusUploader from 'utils/video/TusUploader';
import { encode } from 'utils/video/VideoEncoder';
import toast, { Toaster } from 'react-hot-toast';

const Dropzone = props => {
  const { setIsUpload, setUuid } = props;
  const [currentProgress, setCurrentProgress] = useState(0);
  const done = 'done';
  let response, fileName, fileType;
  const endpoint = 'https://longs-api.iamnew.net/video/upload';
  // const endpoint = 'http://35.216.94.36/video/upload';
  // const endpoint = 'http://localhost:8080/video/upload';

  const onEncoded = useCallback(data => {
    const uploader = TusUploader(
      new File([new Blob([data], { type: 'application/octet-stream' })], fileName),
      endpoint,
      {
        filename: fileName,
        filetype: fileType,
      },
    );
    const onProgress = (bytesUploaded, bytesTotal) => {
      const percentage = Math.round((bytesUploaded / bytesTotal) * 100);
      console.log(bytesUploaded, bytesTotal, percentage + '%');
      setCurrentProgress(percentage);
    };
    // 업로드가 성공적으로 완료되었을 때 실행
    const onSuccess = () => {
      console.log('response =>' + response);
    };
    const onError = err => {
      console.log(err);
    };
    const onBeforeRequest = req => {
      // 로컬 노드js 테스트 시 주석
      const xhr = req.getUnderlyingObject();
      xhr.withCredentials = true;
    };
    // 응답을 성공적으로 받았을 때 실행
    const onAfterResponse = (req, res) => {
      const url = req.getURL();
      response = res.getBody();
      setUuid(response);

      console.log('get url => ' + url);
    };

    uploader.startUpload(onProgress, onSuccess, onError, onBeforeRequest, onAfterResponse);
  }, []);
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = evt => {
      fileName = file.name;
      fileType = file.type;
      toast.promise(
        encode(file.name, evt.target.result, onEncoded),
        {
          loading: '동영상을 인코딩 중입니다.',
          success: '동영상 인코딩이 완료 되었습니다.',
          error: '에러가 발생하였습니다.',
        },
        {
          style: {
            minWidth: 250,
          },
        },
      );
    };
  }, []);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    accept: {
      'video/*': [],
    },
    onDrop,
  });

  const files = acceptedFiles.map(file => <p key={file.path}>{file.path}</p>);
  useEffect(() => {
    if (currentProgress === 100) {
      setIsUpload(true);
    }
  }, [currentProgress]);

  if (files.length > 0) {
    return (
      <div className={'drop-container-full'}>
        <Toaster />
        <CircularProgressbar
          value={currentProgress}
          text={`${response === '' ? done : currentProgress}%`}
          maxValue={101}
        />
      </div>
    );
  }
  return (
    <div className={'drop-container-empty'}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input className={'drop-container-input'} {...getInputProps()} type={'file'} />
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

Dropzone.propTypes = {
  setIsUpload: PropTypes.func,
  setUuid: PropTypes.func,
};
