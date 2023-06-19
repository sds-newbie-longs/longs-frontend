import React, { useCallback, useEffect, useState } from 'react';
import LeftSideBar from 'components/LeftSideBar';
import Header from 'components/Header';
import 'styles/MainPage.scss';
import MemberSideBar from 'components/MemberSideBar';
import ContentsArea from 'components/ContentsArea';
import SearchResultArea from 'components/SearchResultArea';
import { useNavigate } from 'react-router';

const MainPage = () => {
  const navigator = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('id') === null) {
      navigator('/login');
    }
  }, []);
  const handleSearchState = useCallback(() => {
    if (!isSearching) {
      setIsSearching(true);
    }
  });

  const handleDisableSearchState = useCallback(() => {
    setIsSearching(false);
  });

  return (
    <div className={'main-page'}>
      <div className={'left-side-bar'}>
        <LeftSideBar handleDisableSearchState={handleDisableSearchState} />
      </div>
      <div className={'mid-side-bar'}>
        <div className={'header'}>
          <Header handleOnSubmit={handleSearchState} />
        </div>
        <div className={'video-list'}>{isSearching ? <SearchResultArea /> : <ContentsArea />}</div>
      </div>
      <div className={'right-side-bar'}>
        <MemberSideBar
          memberList={[
            { id: sessionStorage.getItem('id'), name: sessionStorage.getItem('username') },
          ]}
        ></MemberSideBar>
      </div>
    </div>
  );
};

export default MainPage;
