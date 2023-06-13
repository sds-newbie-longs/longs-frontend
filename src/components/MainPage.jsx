import React from 'react';
import LeftSideBar from './LeftSideBar';
import Header from './Header';
import 'styles/MainPage.scss';
import MemberSideBar from './MemberSideBar';
import ContentsArea from './ContentsArea';

const MainPage = () => {
  return (
    <div className={'main-page'}>
      <div className={'left-side-bar'}>
        <LeftSideBar />
      </div>
      <div className={'mid-side-bar'}>
        <div className={'header'}>
          <Header />
        </div>
        <div className={'video-list'}>
          <ContentsArea></ContentsArea>
        </div>
      </div>
      <div className={'right-side-bar'}>
        <MemberSideBar></MemberSideBar>
      </div>
    </div>
  );
};

export default MainPage;
