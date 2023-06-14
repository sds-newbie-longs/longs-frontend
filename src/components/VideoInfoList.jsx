import React from 'react';
import PropTypes from 'prop-types';
import VideoInfo from 'components/VideoInfo';
import 'styles/VideoInfoList.scss';
import { useNavigate } from 'react-router';
const VideoInfoList = ({ videoList }) => {
  const navigate = useNavigate();
  VideoInfoList.propTypes = {
    videoList: PropTypes.arrayOf(
      PropTypes.shape({
        picture_url: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };
  const handelOnClickVideo = () => {
    navigate('/articleviwer');
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
