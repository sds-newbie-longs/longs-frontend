import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import AxiosInstance from 'utils/axios/AxiosInstance';
import PropTypes from 'prop-types';
import 'styles/LeftSideBar.scss';
import GroupButton from 'components/GroupButton';
import AddButton from 'components/common/AddButton';
import Tasks from 'utils/axios/group/AxiosGroupTasks';
import BusinessCode from 'utils/common/BuisnessCode';

const LeftSideBar = props => {
  const { handleDisableSearchState, hanleGroupIdState } = props;
  const navigate = useNavigate();
  const groupTextRef = useRef();
  const [addGroupBox, setAddGroupBox] = useState(false);
  const [groupList, setGroupList] = useState([]);

  useEffect(e => {
    Tasks.getSelectGroupsPriomise().then(res => {
      setGroupList([]);
      const code = res.data.code;
      if (code === BusinessCode.GROUP_SELECT_SUCCESS) {
        res.data.channelList.forEach((e, index) => {
          if (index === 0) {
            e.select = true;
          } else {
            e.select = false;
          }
          setGroupList(groupList => [...groupList, e]);
        });
      }
    });
  }, []);

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
  const handleOnSelectClick = evt => {
    setGroupList([]);
    hanleGroupIdState(evt);
    groupList.forEach(e => {
      if (evt === e.channelId) {
        e.select = true;
        setGroupList(groupList => [...groupList, e]);
      } else {
        e.select = false;
        setGroupList(groupList => [...groupList, e]);
      }
    });
    // 여기서 그룹과 동영상이 나오게 하기
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
        {groupList.length === 0
          ? null
          : groupList.map(evt => (
              <GroupButton
                key={evt.channelId}
                groupKey={evt.channelId}
                groupName={evt.name}
                selected={evt.select}
                handleOnSelectClick={handleOnSelectClick}
                handleOnRemoveClick={handleOnRemoveClick}
              ></GroupButton>
            ))}
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

LeftSideBar.propTypes = {
  handleDisableSearchState: PropTypes.func.isRequired,
  hanleGroupIdState: PropTypes.func.isRequired,
};
