import React, { useCallback, useState } from 'react';
import LeftSideBar from 'components/LeftSideBar';
import Header from 'components/Header';
import 'styles/MainPage.scss';
import MemberSideBar from 'components/MemberSideBar';
import ContentsArea from 'components/ContentsArea';
import SearchResultArea from './SearchResultArea';

const MainPage = () => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchState = useCallback(() => {
    setIsSearching(prevState => !prevState);
  });

  return (
    <div className={'main-page'}>
      <div className={'left-side-bar'}>
        <LeftSideBar handleSearchState={handleSearchState} />
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
