import React from 'react';
import 'styles/LeftSideBar.scss';
import GroupButton from 'components/GroupButton';
import AddButton from './common/AddButton';

const LeftSideBar = () => {
  const handleOnRemoveClick = () => {
    console.log('제거 클릭');
  };
  const handleGroupAddClick = () => {
    console.log('추가 클릭');
  };
  return (
    <div className={'left-side-bar-root'}>
      <div className={'main-logo'} />

      <div className={'group-list'}>
        {/*  임시 사용 버튼 */}
        <GroupButton
          groupName={'Knox SRE'}
          selected={true}
          handleOnRemoveClick={handleOnRemoveClick}
        />
        <GroupButton
          groupName={'Knox Common'}
          selected={false}
          handleOnRemoveClick={handleOnRemoveClick}
        />
        <GroupButton
          groupName={'Knox Portal'}
          selected={false}
          handleOnRemoveClick={handleOnRemoveClick}
        />
      </div>

      <AddButton width={40} height={40} handleClick={handleGroupAddClick} />
    </div>
  );
};

export default LeftSideBar;
