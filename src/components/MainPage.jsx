import React from 'react';
import LeftSideBar from 'components/LeftSideBar';
import Header from 'components/Header';
import 'styles/MainPage.scss';
import MemberSideBar from 'components/MemberSideBar';
import ContentsArea from 'components/ContentsArea';

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
