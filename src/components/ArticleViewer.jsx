import React, { useEffect, useState } from 'react';
import 'styles/ArticleViewer.scss';
import MemberInfo from 'components/common/MemberInfo';
import EditSvg from 'components/common/EditSvg';
import DeleteSvg from 'components/common/DeleteSvg';
import PropTypes from 'prop-types';
import generate from 'utils/common/ColorGenerator';
import Video from 'components/common/Video';
import { VideoOptions } from 'utils/common/VideoOptions';
import BusinessCode from 'utils/common/BuisnessCode';
import AxiosVideoTasks from 'utils/axios/video/AxiosVideoTasks';

const ArticleViewer = props => {
  const { groupId, videoId } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  useEffect(() => {
    AxiosVideoTasks.getVideoPromise(groupId, videoId).then(res => {
      const code = res.data.code;
      if (code === BusinessCode.GET_VIDEO_SUCCESS) {
        console.log(res.data);
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setOwner(data.username);
        setVideoSrc(
          'https://d1t7v2x03n53xl.cloudfront.net/videos/' + data.videoUuid + '/master.m3u8',
        );
      }
    });
  }, [videoId]);
  const handleEditOnClick = evt => {
    // todo: implement later
  };

  const handleDeleteOnclick = () => {
    if (confirm('Delete Video?')) {
      AxiosVideoTasks.getDeleteVideoPromise().then(res => {
        const resBody = res.data;
        if (resBody.code === BusinessCode.DELETE_VIDEO_SUCCESS) navigator('/');
        else alert('Error : Cannot Delete Video');
      });
    }
  };

  return (
    <div className={'article-viewer-root'}>
      <div className={'article-viewer-content'}>
        <div className={'article-viewer-video-frame'}>
          <div className={'article-viewer-video-edit'}>
            <EditSvg onClick={handleEditOnClick} />
            <DeleteSvg onClick={handleDeleteOnclick} />
          </div>
          <div className={'article-viewer-video'}>
            <Video options={VideoOptions} src={videoSrc} />
          </div>
        </div>

        <div className={'article-viewer-meta'}>
          <span className={'article-viewer-title'}>{title}</span>
          <MemberInfo name={owner} color={generate()} />
          <div className={'article-viewer-description-container'}>
            <p className={'article-viewer-description'}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleViewer;
ArticleViewer.propTypes = {
  groupId: PropTypes.number.isRequired,
  videoId: PropTypes.number.isRequired,
};
