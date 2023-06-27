const fileSizeLimit = 314_572_800;

function encode(name, data, callback) {
  return new Promise(resolve => {
    if (data.byteLength >= fileSizeLimit) {
      callback(new Blob([data], { type: 'application/octet-stream' }));
      resolve();
    } else {
      const worker = new Worker(new URL('VideoWorker.js', import.meta.url));
      worker.onmessage = function (e) {
        const msg = e.data;
        switch (msg.type) {
          case 'start':
            console.log('start encoding');
            break;
          case 'ready':
            worker.postMessage({ type: 'run', arguments: { name, data } });
            break;
          case 'done':
            callback(new Blob([msg.data], { type: 'application/octet-stream' }));
            resolve();
        }
      };
    }
  });
}

export { encode };
