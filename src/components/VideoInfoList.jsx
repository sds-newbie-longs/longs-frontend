import React from 'react';
import PropTypes from 'prop-types';
import VideoInfo from 'components/VideoInfo';
import 'styles/VideoInfoList.scss';

const VideoInfoList = ({ videoList, handleMainListChangeState }) => {
  VideoInfoList.propTypes = {
    videoList: PropTypes.arrayOf(
      PropTypes.shape({
        boardId: PropTypes.number.isRequired,
        thumbnailUrl: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    ).isRequired,
    handleMainListChangeState: PropTypes.func.isRequired,
  };
  const handelOnClickVideo = () => {
    console.log(videoList.username);
    handleMainListChangeState([3, videoList.boardId]);
  };
  return (
    <div className={'video-info-list-root'}>
      {videoList.map((videoInfoObj, index) => (
        <div key={index} className={'video-info-wrapper'} onClick={handelOnClickVideo}>
          <VideoInfo videoInfoObj={videoInfoObj} />
        </div>
      ))}
    </div>
  );
};
export default VideoInfoList;
