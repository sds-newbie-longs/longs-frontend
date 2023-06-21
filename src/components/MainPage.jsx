import React, { useCallback, useEffect, useState } from 'react';
import LeftSideBar from 'components/LeftSideBar';
import Header from 'components/Header';
import 'styles/MainPage.scss';
import MemberSideBar from 'components/MemberSideBar';
import ContentsArea from 'components/ContentsArea';
import SearchResultArea from 'components/SearchResultArea';
import { useNavigate } from 'react-router';
import Tasks from 'utils/axios/member/AxiosMemberTasks';
import PropTypes from 'prop-types';

const MainPage = props => {
  const navigator = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [groupId, setGroupId] = useState(-1);

  const setUesrInfo = data => {
    props.handleOnUesrInfo({ userName: data.username, userId: data.id });
  };
  useEffect(() => {
    Tasks.getMemberIdPromise()
      .then(res => {
        const data = res.data;
        console.log(data);
        setUesrInfo(data);
      })
      .catch(res => {
        navigator('/login');
      });
  }, []);

  const handleSearchState = useCallback(() => {
    if (!isSearching) {
      setIsSearching(true);
    }
  });
  const hanleGroupIdState = evt => {
    setGroupId(evt);
  };
  const handleDisableSearchState = useCallback(groupId => {
    setIsSearching(false);
  });

  return (
    <div className={'main-page'}>
      <div className={'left-side-bar'}>
        <LeftSideBar
          handleDisableSearchState={handleDisableSearchState}
          hanleGroupIdState={hanleGroupIdState}
        />
      </div>
      <div className={'mid-side-bar'}>
        <div className={'header'}>
          <Header handleOnSubmit={handleSearchState} />
        </div>
        <div className={'video-list'}>{isSearching ? <SearchResultArea /> : <ContentsArea />}</div>
      </div>
      <div className={'right-side-bar'}>
        <MemberSideBar groupId={groupId}></MemberSideBar>
      </div>
    </div>
  );
};
MainPage.propTypes = {
  userId: PropTypes.number,
  userName: PropTypes.string,
  handleOnUesrInfo: PropTypes.func,
};
export default MainPage;
