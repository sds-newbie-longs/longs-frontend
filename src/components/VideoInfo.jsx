import React from 'react';
import PropTypes from 'prop-types';
import 'styles/VideoInfo.scss';

const VideoInfo = ({ videoInfoObj }) => {
  VideoInfo.propTypes = {
    videoInfoObj: PropTypes.shape({
      picture_url: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };
  return (
    <div className={'video-info-root'}>
      <div className={'video-info-thumbnail'}>
        <img src={videoInfoObj.picture_url} alt={'VIDEO'} />
      </div>
      <div className={'video-info-text-container'}>
        <div className={'video-info-text-owner'}>{videoInfoObj.owner}</div>
        <div className={'video-info-text-owner'}>{videoInfoObj.title}</div>
      </div>
    </div>
  );
};

export default VideoInfo;
