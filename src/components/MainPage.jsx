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
  const [group, setGroup] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    check().catch(() => {
      navigator('/login');
    });
  }, []);

  const handleSearchState = useCallback(searchKeyword => {
    if (!isSearching) {
      setIsSearching(true);
      setSearchKeyword(searchKeyword);
    }
  }, []);
  const handleGroupState = group => {
    console.log('group changed');
    setGroup(group);
  };
  const handleDisableSearchState = useCallback(() => {
    setIsSearching(false);
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
          {isSearching ? (
            <SearchResultArea searchKeyword={searchKeyword} groupId={group.id} />
          ) : (
            <ContentsArea groupId={group.id} />
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
