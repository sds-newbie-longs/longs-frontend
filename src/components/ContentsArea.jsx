import React, { useState, useEffect } from 'react';
import ContentAreaApiModule from 'utils/ContentAreaApiModule';
import 'styles/ContentsArea.scss';
import { ReactComponent as NoContentImg } from 'assets/noContents.svg';
import VideoInfoList from './VideoInfoList';
const ContentsArea = () => {
  const mockPropGroup = 'Knox SRE';
  const mockPropUsers = ['Silence', 'din'];
  const [contentsInfoLists, setContentsInfoLists] = useState([]);

  const contentAreaApiModule = new ContentAreaApiModule();
  const fetchData = async () => {
    try {
      const firstList = await contentAreaApiModule.mockGetAllContentsWithGroup(mockPropGroup);
      let userVideoList = [];
      for (const userName of mockPropUsers) {
        const userVideos = await contentAreaApiModule.mockGetAllContentsWithName(mockPropGroup, [
          userName,
        ]);
        userVideoList = [...userVideoList, userVideos];
      }
      const contentsLists = [firstList, ...userVideoList];

      if (contentsLists.every(list => list.length === 0)) {
        setContentsInfoLists([]);
      } else {
        setContentsInfoLists(contentsLists);
      }
    } catch (error) {
      console.error(error);
      setContentsInfoLists([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 빈 의존성 배열

  return (
    <div className="contents-area-root">
      {contentsInfoLists.length === 0 ? (
        <div className={'contents-area-root-empty'}>
          <NoContentImg />
        </div>
      ) : (
        <div className={'contents-area-list'}>
          {contentsInfoLists.map((list, index) => (
            <div key={index} className={'contents-area-video-info-container'}>
              <div className={'contents-area-video-info-container-info-wrapper'}>
                <div className={'contents-area-video-info-list-container-title'}>
                  {index === 0 ? 'Recent Uploads' : mockPropUsers[index - 1]}{' '}
                </div>
                <div className={'contents-area-video-list-wrapper-view-all'}>View All</div>
              </div>
              <div className={'video-info-list-container'}>
                <VideoInfoList videoList={list} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentsArea;
