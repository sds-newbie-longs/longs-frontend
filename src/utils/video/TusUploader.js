import * as tus from 'tus-js-client';

const TusUploader = (givenFile, givenEndpoint, givenMetadata) => {
  if (!tus.isSupported) {
    alert('This browser does not support uploads. Please use a modern browser instead.');
  }

  let upload = null;

  const startUpload = () => {
    upload = new tus.Upload(givenFile, {
      endpoint: givenEndpoint,
      metadata: givenMetadata,

      onShouldRetry: function (err, retryAttempt, options) {
        console.log('Error =>', err);
        console.log('Original Request => ', err.originalRequest);
        console.log('then get Response =>', err.originalResponse);

        const status = err.originalResponse ? err.originalResponse.getStatus() : 0;
        // Do not retry if the status is a 403.
        if (status === 403) {
          return false;
        }

        // For any other status code, we retry.
        return true;
      },
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
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    // Access response headers
    upload._onXHRProgress = function (e) {
      const responseHeaders = e.target.getAllResponseHeaders();
      console.log('Response headers:', responseHeaders);
    };

    upload.start();
    console.log(`upload started.... => ${givenFile.name}`);
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
