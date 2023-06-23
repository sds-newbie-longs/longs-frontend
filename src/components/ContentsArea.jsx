import React, { Fragment, useCallback, useEffect, useState } from 'react';
import 'styles/ContentsArea.scss';
import { ReactComponent as NoContentImg } from 'assets/noContents.svg';
import VideoInfoList from 'components/VideoInfoList';
import Tasks from 'utils/axios/video/AxiosVideoTasks';
import PropTypes from 'prop-types';
import BusinessCode from 'utils/common/BuisnessCode';

const ContentsArea = props => {
  const { groupId } = props;

  const [allBoardList, setAllBoardList] = useState([]);
  const [memberBoardList, setMemberBoardList] = useState([]);

  useEffect(() => {
    if (groupId !== -1) {
      getVideoListByGroup();
    }
  }, [groupId]);

  const getVideoListByGroup = () => {
    groupId &&
      Tasks.getVideoListByGroup(groupId)
        .then(res => {
          const body = res.data;
          if (body.code === BusinessCode.GET_VIDEO_LIST_SUCCESS) {
            console.log(body);
            setAllBoardList(body.allBoardList);
            setMemberBoardList(body.memberBoardList);
          }
        })
        .catch(reason => console.log(reason));
  };

  const getMemberBoardListJsx = useCallback((boardList, username, index) => {
    if (boardList.length > 0) {
      return (
        <Fragment key={index}>
          <div className={'contents-area-video-info-container'} key={index}>
            <div className={'contents-area-video-info-container-info-wrapper'}>
              <div className={'contents-area-video-info-list-container-title'}>
                <span>{username}</span>
              </div>
              <div className={'contents-area-video-list-wrapper-view-all'}>View All</div>
            </div>
            <div className={'video-info-list-container'}>
              <VideoInfoList videoList={boardList} />
            </div>
          </div>
          <hr className={'hr'} />
        </Fragment>
      );
    }
  }, []);

  return (
    <div className="contents-area-root">
      {allBoardList.length === 0 ? (
        <div className={'contents-area-root-empty'}>
          <NoContentImg />
        </div>
      ) : (
        <div className={'contents-area-list'}>
          <Fragment>
            <div className={'contents-area-video-info-container'}>
              <div className={'contents-area-video-info-container-info-wrapper'}>
                <div className={'contents-area-video-info-list-container-title'}>
                  <span>Recent Uploads</span>
                </div>
                <div className={'contents-area-video-list-wrapper-view-all'}>View All</div>
              </div>
              <div className={'video-info-list-container'}>
                <VideoInfoList videoList={allBoardList} />
              </div>
            </div>
            <hr className={'hr'} />
            {memberBoardList.map((memberBoardList, index) => {
              return getMemberBoardListJsx(
                memberBoardList.boardList,
                memberBoardList.username,
                index,
              );
            })}
          </Fragment>
        </div>
      )}
    </div>
  );
};
export default ContentsArea;
ContentsArea.propTypes = {
  groupId: PropTypes.number,
};
