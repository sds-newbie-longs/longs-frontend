import React from 'react';
import SearchField from 'components/common/SearchField';
import MemberInfoList from 'components/MemberInfoList';
import 'styles/MemberSideBar.scss';

const MemberSideBar = props => {
  const members = [
    { id: 1, name: 'din' },
    { id: 2, name: 'soy' },
    { id: 3, name: 'silence' },
    { id: 4, name: 'harry' },
  ];
  return (
    <div className={'member-side-bar-root'}>
      <div className={'member-side-bar-search-field-container'}>
        <SearchField
          isBordered={false}
          placeholder={'Search Members'}
          handleOnSubmit={data => console.log(data)}
        />
      </div>
      <div className={'member-side-bar-member-list-container'}>
        <span className={'member-side-bar-member-count'}>Members - {members.length}</span>
        <hr />
        <MemberInfoList members={members} />
      </div>
    </div>
  );
};

export default MemberSideBar;
