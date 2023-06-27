import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const VideoEncoder = props => {
  const { orgFile } = props;
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const [outputFile, setOutputFile] = useState(null);
  const [encodingProgress, setEncodingProgress] = useState(0);

  useEffect(() => {
    console.log(`${orgFile.path}`);
    const ffmpeg = createFFmpeg({ log: true });

    // videoEncoder 컴포넌트 마운트 시 ffmpeg.wasm 로드
    const loadFfmpeg = async () => {
      if (!ffmpegReady) {
        await ffmpeg.load();
        setFfmpegReady(true);
      }
    };

    loadFfmpeg();

    // 인코딩 실행
    const encodeVideo = async () => {
      if (ffmpegReady) {
        setEncodingProgress(0);

        // input output file name
        const inputFileName = orgFile.path;
        const outputFileName = inputFileName + `ouput.mp4`;

        // inputfile을 FFmpeg filesystem에 쓰기
        ffmpeg.FS('writeFile', inputFileName, await fetchFile(orgFile));

        const args = ['-i', inputFileName, '-c:v', 'libx264', outputFileName];

        // 인코딩 시작
        await ffmpeg.run(...args);

        // 인코딩된 파일 불러오기
        const data = ffmpeg.FS('readFile', outputFileName);

        // Blob 생성
        const encodeVideo = new Blob([data.buffer], { type: 'video/mp4' });

        // output 생성
        setOutputFile(encodeVideo);
        setEncodingProgress(100);
      }
    };
    encodeVideo();
  }, []);

  return (
    <div>
      {' '}
      {outputFile && (
        <div>
          <h3>Encoded Video</h3>
          <video controls>
            <source src={URL.createObjectURL(outputFile)} type="video/mp4" />
          </video>
        </div>
      )}
      {encodingProgress > 0 && <div>Encoding Progress: {encodingProgress}%</div>}
    </div>
  );
};

export default VideoEncoder;

VideoEncoder.propTypes = {
  orgFile: PropTypes.object.isRequired,
};
