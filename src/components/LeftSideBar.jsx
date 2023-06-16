import React, { useRef, useState } from 'react';
import 'styles/LeftSideBar.scss';
import GroupButton from 'components/GroupButton';
import AddButton from 'components/common/AddButton';
import { useNavigate } from 'react-router';
import AxiosInstance from '../utils/axios/AxiosInstance';

const LeftSideBar = props => {
  const { handleDisableSearchState } = props;
  const navigate = useNavigate();
  const groupTextRef = useRef();
  const [addGroupBox, setAddGroupBox] = useState(false);
  const handleOnRemoveClick = () => {
    console.log('제거 클릭');
  };
  const handleGroupAddClick = () => {
    setAddGroupBox(!addGroupBox);
  };
  const handleOnClickLogo = () => {
    handleDisableSearchState();
    navigate('/');
  };

  function handleOnClickAddGroupButton() {
    console.log(groupTextRef.current.value + '라고 그룹 명 전송');
    AxiosInstance.post('', { groupName: groupTextRef.current.value })
      .then(response => {
        console.log(response);
        // 전송후 잘 되었다면?
        // 전송후 실패 했다면?
      })
      .catch(response => {
        console.log(response);
      });
  }
  return (
    <div className={'left-side-bar-root'}>
      <div className={'main-logo'} onClick={handleOnClickLogo} />

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
      <div className={'add-group-box'}>
        {addGroupBox ? (
          <>
            <input className={'add-group-box-input'} type="text" ref={groupTextRef} />
            <div className={'add-group-box-button'} onClick={handleOnClickAddGroupButton} />
          </>
        ) : null}
      </div>
      <AddButton handleClick={handleGroupAddClick} />
    </div>
  );
};

export default LeftSideBar;
