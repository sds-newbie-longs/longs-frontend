import React, { useState, useEffect } from 'react';
import ContentAreaApiModule from 'utils/ContentAreaApiModule';

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
            <div key={index}>
              <div>
                <span className={'video-list-wrapper-title'}>
                  {index === 0 ? 'Recent Uploads' : mockPropUsers[index - 1]}{' '}
                </span>
                <span className={'video-list-wrapper-view-all'}>View All</span>
              </div>
              {list.map((item, subIndex) => (
                <span key={subIndex} className={'video-list-wrapper'}>
                  <span> {item.owner} </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentsArea;
