import React from 'react';
import 'styles/ArticleViewer.scss';
import MemberInfo from 'components/common/MemberInfo';
import EditSvg from 'components/common/EditSvg';
import DeleteSvg from 'components/common/DeleteSvg';
import PropTypes from 'prop-types';
import generate from 'utils/common/ColorGenerator';
import Tasks from 'utils/axios/video/AxiosVideoTasks';
import BusinessCode from 'utils/common/BuisnessCode';
import { useNavigate } from 'react-router';

const ArticleViewer = props => {
  const { description, title, owner, viewCount } = props;
  const navigator = useNavigate();

  const handleEditOnClick = evt => {
    // todo: implement later
  };

  const handleDeleteOnclick = () => {
    if (confirm('Delete Video?')) {
      Tasks.getDeleteVideoPromise().then(res => {
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
          <div className={'article-viewer-video'}></div>
        </div>

        <div className={'article-viewer-meta'}>
          <span className={'article-viewer-title'}>{title}</span>
          <MemberInfo name={owner} color={generate()} />
          <div className={'article-viewer-description-container'}>
            <p className={'article-viewer-view-count'}>조회수 {viewCount}</p>
            <p className={'article-viewer-description'}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleViewer;
ArticleViewer.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  viewCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};
