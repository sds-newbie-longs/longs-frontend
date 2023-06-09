import { Upload } from 'tus-js-client';

const TusUploader = (file, endpoint, metadata) => {
  let upload = null;

  const startUpload = (onProgress, onSuccess, onError, onBeforeRequest, onAfterResponse) => {
    const options = {
      endpoint,
      metadata,
      onError,
      onProgress,
      onSuccess,
      onBeforeRequest,
      onAfterResponse,
    };
    upload = new Upload(file, options);
    upload.start();
  };

  const pauseUpload = () => {
    if (upload) {
      upload.abort();
    }
  };

  const resumeUpload = () => {
    if (upload) {
      upload.start();
    }
  };

  return {
    startUpload,
    pauseUpload,
    resumeUpload,
  };
};

export default TusUploader;
