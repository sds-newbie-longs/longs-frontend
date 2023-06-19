import * as tus from 'tus-js-client';

const TusUploader = (givenFile, givenEndpoint, givenMetadata) => {
  let upload = null;

  const startUpload = () => {
    upload = new tus.Upload(givenFile, {
      endpoint: givenEndpoint,
      metadata: givenMetadata,
      onError: function (error) {
        console.log(`Failed Because of: ${error}`);
        console.log({ ProgressEvent });
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + '%');
      },
      onSuccess: function () {
        console.log('Download %s from %s', upload.file.name, upload.url);
      },
    });
    upload.start();
    console.log(`started....${givenFile.name}`);
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
