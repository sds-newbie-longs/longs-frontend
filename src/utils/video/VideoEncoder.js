function encode(name, data, callback) {
  const worker = new Worker(new URL('VideoWorker.js', import.meta.url));
  worker.onmessage = function (e) {
    const msg = e.data;
    switch (msg.type) {
      case 'ready':
        console.log('worker ready');
        worker.postMessage({ type: 'run', arguments: { name, data } });
        break;
      case 'stdout':
        console.log(msg.data);
        break;
      case 'stderr':
        console.log(msg.data);
        break;
      case 'start':
        console.log(msg.data);
        break;
      case 'done':
        console.log(msg.data);
        callback(msg.data);
    }
  };
}

// 테스트용 메소드
/* function createDownloadLinkElement(data) {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(createBlob(data));
  downloadLink.download = 'encoded.mp4'; // 저장될 파일명 및 확장자
  document.body.appendChild(downloadLink);
}

function createBlob(data) {
  return new Blob([data], { type: 'application/octet-stream' });
} */

export { encode };
