import { createFFmpeg } from '@ffmpeg/ffmpeg';

let interval, ffmpeg, resultFileName, currentCodec, name, data, fileName;

// const chunkingThreshold = 314_572_800;

async function encodeVideo() {
  await ffmpeg.run('-i', name, '-c:v', 'libx264', '-c:a', 'copy', resultFileName);
}

async function loadFFmpeg() {
  ffmpeg = createFFmpeg({
    log: true,
    progress: p => {
      clearInterval(interval);
      interval = setInterval(() => console.log('progress : ', p.ratio), 500);
    },
  });
  await ffmpeg.load();
}

function bindConsoleLog() {
  console.log.bind(console);
  console.log = (...args) => {
    const codec = getCodec(...args);
    if (codec) currentCodec = codec;
  };
}

function init(evt) {
  const module = {
    arguments: evt.data.arguments || [],
  };

  name = removeSpaces(module.arguments.name);
  data = module.arguments.data;
  fileName = getFileName(name);
  resultFileName = 'encoded_' + fileName + '.mp4';
}

async function setCurrentCodec() {
  ffmpeg.FS('writeFile', name, new Uint8Array(data));
  await ffmpeg.run('-i', name, name);
}

self.onmessage = async evt => {
  init(evt);
  const originalLog = console.log;
  bindConsoleLog();

  await loadFFmpeg();

  await setCurrentCodec();
  console.log = originalLog;
  if (currentCodec !== 'h264') {
    await encodeVideo();
    ffmpeg.FS('unlink', name);
  } else {
    console.log('codec is already h264!');
  }

  clearInterval(interval);
  console.log('encode complete');

  const result = currentCodec === 'h264' ? data : ffmpeg.FS('readFile', resultFileName);
  ffmpeg.exit();

  postMessage({
    type: 'done',
    data: result,
  });
};

postMessage({
  type: 'ready',
});

const getCodec = string => {
  const regex = /Video:\s*(?<codec>[^,\s]+)/;
  const match = string.match(regex);
  if (match) return match.groups.codec;
};

const getFileName = file => {
  const lastDotIndex = file.lastIndexOf('.');
  return file.slice(0, lastDotIndex);
};

// 이 밑으로는 다음에
// 대용량 파일을 청크 단위로 분할하여 처리하는 함수
// eslint-disable-next-line no-unused-vars
/* async function processLargeFile(fileData) {
  console.log('processing large file...');
  const CHUNK_SIZE = 4 * 1024 * 1024; // 청크 크기 (4MB)

  const fileSize = fileData.byteLength;
  fileData = new Uint8Array(fileData);
  let offset = 0;
  const chunkPromises = [];

  // 파일을 청크 단위로 처리
  while (offset < fileSize) {
    console.log(offset + '/' + fileSize);
    const chunkData = fileData.subarray(offset, offset + CHUNK_SIZE);

    // ffmpeg.wasm을 사용하여 청크 처리
    const processedChunk = await processChunk(chunkData);
    chunkPromises.push(processedChunk);

    offset += CHUNK_SIZE;
  }

  // 모든 청크가 처리된 후 파일 합치기
  await mergeChunks(chunkPromises);
}

// 청크를 처리하는 함수 (ffmpeg.wasm 사용)
async function processChunk(chunkData) {
  // 청크 데이터를 ffmpeg.wasm의 파일 시스템에 저장
  const chunkFilename = 'chunk.mp4';
  const chunkOutputName = 'chunk.mp4';
  ffmpeg.FS('writeFile', chunkFilename, chunkData);

  // 청크 데이터를 인코딩 등의 작업에 활용
  await ffmpeg.run('-i', chunkFilename, '-c:v', 'libx264', '-c:a', 'copy', chunkOutputName);

  // 처리된 청크 반환
  const encodedChunk = ffmpeg.FS('readFile', chunkOutputName);
  // 필요한 작업 수행 후 청크 파일 삭제
  ffmpeg.FS('unlink', chunkOutputName);
  return encodedChunk;
}

// 청크를 합치는 함수
async function mergeChunks(chunkPromises) {
  // 모든 청크를 합치는 작업 수행
  const mergedChunks = await Promise.all(chunkPromises);

  // 합쳐진 청크를 하나의 Uint8Array로 병합
  const mergedLength = mergedChunks.reduce(
    (totalLength, chunk) => totalLength + chunk.byteLength,
    0,
  );
  const mergedData = new Uint8Array(mergedLength);
  let offset = 0;
  for (const chunk of mergedChunks) {
    mergedData.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return mergedData;
}

// 파일의 크기를 확인하는 함수
function getFileSizeFromUint8Array(array) {
  return array.byteLength;
} */

function removeSpaces(str) {
  return str.replace(/\s/g, '');
}
