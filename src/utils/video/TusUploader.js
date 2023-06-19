import * as tus from 'tus-js-client';

const TusUploader = (file, endpoint, metadata) => {
  let upload = null;

  const startUpload = () => {
    upload = new tus.Upload(file, {
      endpoint,
      metadata,
    });
    upload.start();
    console.log(`started....`);
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
