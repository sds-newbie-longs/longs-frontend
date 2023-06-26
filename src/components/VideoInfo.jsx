import React from 'react';
import PropTypes from 'prop-types';
import 'styles/VideoInfo.scss';

const VideoInfo = ({ videoInfoObj }) => {
  VideoInfo.propTypes = {
    videoInfoObj: PropTypes.shape({
      thumbnailUrl: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };
  return (
    <div className={'video-info-root'}>
      <div className={'video-info-thumbnail'}>
        <img src={videoInfoObj.thumbnailUrl} alt={'VIDEO'} crossOrigin={'anonymous'} />
      </div>
      <div className={'video-info-text-container'}>
        <div className={'video-info-text-owner'}>{videoInfoObj.username}</div>
        <div className={'video-info-text-owner'}>{videoInfoObj.title}</div>
      </div>
    </div>
  );
};

export default VideoInfo;
