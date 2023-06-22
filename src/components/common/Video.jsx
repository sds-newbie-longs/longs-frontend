import React, { useCallback, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import PropTypes from 'prop-types';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';

export const Video = props => {
  const { options, src } = props;

  const getOptions = useCallback(() => {
    return {
      ...options,
      sources: [
        {
          src,
          type: 'application/x-mpegURL',
        },
      ],
    };
  }, []);

  const onVideoPlayerReady = player => {
    player.hlsQualitySelector({
      displayCurrentQuality: true,
    });
  };

  useEffect(() => {
    const player = videojs('video', getOptions(), () => {
      onVideoPlayerReady(player);
    });
  }, [options]);

  return <video-js id="video" class={'vjs-big-play-centered'}></video-js>;
};

export default Video;
Video.propTypes = {
  options: PropTypes.object,
  onReady: PropTypes.func,
  src: PropTypes.string.isRequired,
};
