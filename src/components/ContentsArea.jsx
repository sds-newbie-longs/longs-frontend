import React, { useState, useEffect } from 'react';
import ContentAreaApiModule from 'utils/ContentAreaApiModule';
import 'styles/ContentsArea.scss';
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
      setContentsInfoLists([firstList, ...userVideoList]);
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
        <div>NO CONTENTS</div>
      ) : (
        <div className={'contents-area-list'}>
          {contentsInfoLists.map((list, index) => (
            <div key={index} className={'contents-area-video-info-list-container'}>
              <div className={'contents-area-video-info-list-container-info-wrapper'}>
                <div className={'contents-area-video-info-list-container-title'}>
                  {index === 0 ? 'Recent Uploads' : mockPropUsers[index - 1]}{' '}
                </div>
                <div className={'contents-area-video-list-wrapper-view-all'}>View All</div>
              </div>
              {/**/}
              <div className={'video-info-list-container'}>
                {list.map((item, subIndex) => (
                  <div key={subIndex} className={'video-list-wrapper'}>
                    <span> {item.owner} </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentsArea;
