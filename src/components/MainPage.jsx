import React, { useCallback, useEffect, useState } from 'react';
import LeftSideBar from 'components/LeftSideBar';
import Header from 'components/Header';
import 'styles/MainPage.scss';
import MemberSideBar from 'components/MemberSideBar';
import ContentsArea from 'components/ContentsArea';
import SearchResultArea from 'components/SearchResultArea';
import { useNavigate } from 'react-router';
import check from 'utils/common/SessionChecker';

const MainPage = () => {
  const navigator = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [groupId, setGroupId] = useState(-1);

  useEffect(() => {
    check().catch(() => {
      navigator('/login');
    });
  }, []);

  const handleSearchState = useCallback(() => {
    if (!isSearching) {
      setIsSearching(true);
    }
  }, []);
  const handleGroupIdState = evt => {
    setGroupId(evt);
  };
  const handleDisableSearchState = useCallback(() => {
    setIsSearching(false);
  }, []);

  return (
    <div className={'main-page'}>
      <div className={'left-side-bar'}>
        <LeftSideBar
          handleDisableSearchState={handleDisableSearchState}
          handleGroupIdState={handleGroupIdState}
          userId={sessionStorage.getItem('id')}
        />
      </div>
      <div className={'mid-side-bar'}>
        <div className={'header'}>
          <Header handleOnSubmit={handleSearchState} />
        </div>
        <div className={'video-list'}>
          {isSearching ? <SearchResultArea /> : <ContentsArea groupId={groupId} />}
        </div>
      </div>
      <div className={'right-side-bar'}>
        <MemberSideBar groupId={groupId}></MemberSideBar>
      </div>
    </div>
  );
};
export default MainPage;
