import React, { useCallback, useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import PropTypes from 'prop-types';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';

export const Video = props => {
  const videoRef = useRef();
  const playerRef = useRef();
  const { options, onReady, src } = props;

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

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, getOptions(), () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      }));

      player.hlsQualitySelector({
        displayCurrentQuality: true,
      });

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src({ ...options.sources, withCredentials: true });
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className={'video-root'}>
      <div ref={videoRef} className={'video-player'} />
    </div>
  );
};

export default Video;
Video.propTypes = {
  options: PropTypes.object,
  onReady: PropTypes.func,
  src: PropTypes.string.isRequired,
};
