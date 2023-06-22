import React, { useCallback, useEffect, useState } from 'react';
import LeftSideBar from 'components/LeftSideBar';
import Header from 'components/Header';
import 'styles/MainPage.scss';
import MemberSideBar from 'components/MemberSideBar';
import ContentsArea from 'components/ContentsArea';
import SearchResultArea from 'components/SearchResultArea';
import { useNavigate } from 'react-router';
import check from 'utils/common/SessionChecker';
import ArticleViewer from './ArticleViewer';

const MainPage = () => {
  const navigator = useNavigate();
  const [isMainList, setIsMainList] = useState(0); // 0 : 기본 화면, 1 : 검색, 2 : 상세 페이지
  const [groupId, setGroupId] = useState(-1);
  const [searchKeyword, setSearchKeyword] = useState('');
  // const [videoinfo, setVideoInfo] = useState([]);

  useEffect(() => {
    check().catch(() => {
      navigator('/login');
    });
  }, []);

  const handleSearchState = useCallback(searchKeyword => {
    setIsMainList(1);
    setSearchKeyword(searchKeyword);
  }, []);
  const handleGroupIdState = evt => {
    setGroupId(evt);
  };
  const handleMainListChangeState = useCallback(evt => {
    if (typeof evt === 'number') {
      setIsMainList(evt);
    } else {
      setIsMainList(evt[0]);
      console.log(evt);
    }
  }, []);

  return (
    <div className={'main-page'}>
      <div className={'left-side-bar'}>
        <LeftSideBar
          handleMainListChangeState={handleMainListChangeState}
          handleGroupIdState={handleGroupIdState}
          userId={sessionStorage.getItem('id')}
        />
      </div>
      <div className={'mid-side-bar'}>
        <div className={'header'}>
          <Header handleOnSubmit={handleSearchState} />
        </div>
        <div className={'video-list'}>
          {isMainList === 0 ? (
            <ContentsArea groupId={groupId} handleMainListChangeState={handleMainListChangeState} />
          ) : isMainList === 1 ? (
            <SearchResultArea
              searchKeyword={searchKeyword}
              groupId={groupId}
              handleMainListChangeState={handleMainListChangeState}
            />
          ) : (
            <ArticleViewer
              title={'title'}
              description={'description'}
              owner={'owner'}
              viewCount={30}
              videoSrc={
                'https://act-longs.s3.ap-northeast-2.amazonaws.com/videos/c0c5afcaaad24d91bfb777440ef3bc12/master.m3u8'
              }
            />
          )}
        </div>
      </div>
      <div className={'right-side-bar'}>
        <MemberSideBar groupId={groupId}></MemberSideBar>
      </div>
    </div>
  );
};
export default MainPage;
