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
  const [group, setGroup] = useState({});
  const [isMainList, setIsMainList] = useState(0); // 0 : 기본 화면, 1 : 검색, 2 : 상세 페이지
  const [searchKeyword, setSearchKeyword] = useState('');
  const [videoId, setVideoId] = useState();

  useEffect(() => {
    check().catch(() => {
      navigator('/login');
    });
  }, []);

  const handleSearchState = useCallback(searchKeyword => {
    setIsMainList(1);
    setSearchKeyword(searchKeyword);
  }, []);
  const handleGroupState = group => {
    console.log('group changed');
    setGroup(group);
  };
  const handleMainListChangeState = useCallback(evt => {
    if (typeof evt === 'number') {
      setIsMainList(evt);
    } else {
      setIsMainList(evt[0]);
      setVideoId(evt[1]);
    }
  }, []);

  return (
    <div className={'main-page'}>
      <div className={'left-side-bar'}>
        <LeftSideBar
          handleDisableSearchState={handleDisableSearchState}
          handleGroupIdState={handleGroupState}
          handleGroupState={handleGroupState}
        />
      </div>
      <div className={'mid-side-bar'}>
        <div className={'header'}>
          <Header handleOnSubmit={handleSearchState} groupId={group.id} groupName={group.name} />
        </div>
        <div className={'video-list'}>
          {isMainList === 0 ? (
            <ContentsArea groupId={group.id} handleMainListChangeState={handleMainListChangeState} />
          ) : isMainList === 1 ? (
            <SearchResultArea
              searchKeyword={searchKeyword}
              groupId={group.id}
              handleMainListChangeState={handleMainListChangeState}
            />
          ) : (
            <ArticleViewer groupId={groupId} videoId={videoId} />
          )}
        </div>
      </div>
      <div className={'right-side-bar'}>
        <MemberSideBar groupId={group.id}></MemberSideBar>
      </div>
    </div>
  );
};
export default MainPage;
