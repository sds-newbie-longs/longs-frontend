import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import 'styles/LeftSideBar.scss';
import GroupButton from 'components/GroupButton';
import AddButton from 'components/common/AddButton';
import Tasks from 'utils/axios/group/AxiosGroupTasks';
import BusinessCode from 'utils/common/BuisnessCode';
import AxiosGroupMemberTasks from '../utils/axios/group_member/AxiosGroupMemberTasks';

const LeftSideBar = props => {
  const { handleDisableSearchState, hanleGroupIdState } = props;
  const navigate = useNavigate();
  const groupTextRef = useRef();
  const [addGroupBox, setAddGroupBox] = useState(false);
  const [groupList, setGroupList] = useState([]);

  useEffect(e => {
    getGroupList(0);
  }, []);
  const getGroupList = groupListSelected => {
    Tasks.getSelectGroupsPromise().then(res => {
      setGroupList([]);
      const code = res.data.code;
      if (code === BusinessCode.GROUP_SELECT_SUCCESS) {
        console.log(res.data.channelList);
        if (res.data.channelList.length !== 0) {
          res.data.channelList.forEach((e, index) => {
            if (index === groupListSelected) {
              e.select = true;
              hanleGroupIdState(e.channelId);
            } else {
              e.select = false;
            }
            setGroupList(groupList => [...groupList, e]);
          });
        } else {
          // 그룹이 존재 하지 않음.
          hanleGroupIdState(0);
        }
      }
    });
  };
  const handleOnRemoveClick = (groupKey, ownerId) => {
    console.log(groupKey, ownerId);
    //
    console.log(props.userId);
    if (props.userId === ownerId) {
      console.log('소유자이기에 그룹을 삭제');
      Tasks.getDeleteGroupsPromise(groupKey).then(async res => {
        const code = res.data.code;
        if (code === BusinessCode.GROUP_DELETE_SUCCESS) {
          console.log(res.data);
          await getGroupList(0);
        }
      });
    } else {
      console.log('회원이기에 그룹을 탈퇴');
      AxiosGroupMemberTasks.getDeleteGroupMemberPromise(groupKey).then(async res => {
        const code = res.data.code;
        if (code === BusinessCode.GROUP_MEMBER_DELETE_SUCCESS) {
          console.log(res.data);
          await getGroupList(0);
        }
      });
    }
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
    getGroupList(evt - 1);
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
    Tasks.getInsertGroupsPromise(groupTextRef.current.value)
      .then(response => {
        const code = response.data.code;
        // 전송후 잘 되었다면?
        if (code === BusinessCode.GROUP_INSERT_SUCCESS) {
          getGroupList();
          setAddGroupBox(false);
        }
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
                groupName={evt.channelName}
                ownerId={evt.ownerId}
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
  userId: PropTypes.string,
};
