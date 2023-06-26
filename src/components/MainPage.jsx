import React, { useCallback, useEffect, useState } from 'react';
import LeftSideBar from 'components/LeftSideBar';
import Header from 'components/Header';
import 'styles/MainPage.scss';
import MemberSideBar from 'components/MemberSideBar';
import ContentsArea from 'components/ContentsArea';
import SearchResultArea from 'components/SearchResultArea';
import { useNavigate } from 'react-router';
import check from 'utils/common/SessionChecker';
import ArticleViewer from 'components/ArticleViewer';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

const MainPage = props => {
  const navigator = useNavigate();
  const [isMainList, setIsMainList] = useState(0); // 0 : 기본 화면, 1 : 검색, 2 : 상세 페이지
  const [groupId, setGroupId] = useState(-1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [videoId, setVideoId] = useState();

  const { uploadCode } = props;

  useEffect(() => {
    if (uploadCode === 200) {
      const notify = () => toast.success('게시물이 성공적으로 업로드 되었습니다.');
      notify();
    } else if (uploadCode === 400) {
      const notify = () => toast.error('게시물 업로드를 실패하였습니다.');
      notify();
    } else {
      toast.dismiss();
    }
    console.log('main page => ' + uploadCode);
  }, [uploadCode]);

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
      setVideoId(evt[1]);
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
            <ArticleViewer groupId={groupId} videoId={videoId} />
          )}
        </div>
      </div>
      <div className={'right-side-bar'}>
        <MemberSideBar groupId={groupId}></MemberSideBar>
      </div>
      <Toaster />
    </div>
  );
};
export default MainPage;

MainPage.propTypes = {
  uploadCode: PropTypes.any,
};
