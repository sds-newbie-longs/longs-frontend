import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import 'styles/LeftSideBar.scss';
import GroupButton from 'components/GroupButton';
import AddButton from 'components/common/AddButton';
import Tasks from 'utils/axios/group/AxiosGroupTasks';
import BusinessCode from 'utils/common/BuisnessCode';
import AxiosGroupMemberTasks from 'utils/axios/group_member/AxiosGroupMemberTasks';

const LeftSideBar = props => {
  const { handleDisableSearchState, handleGroupState } = props;
  const navigate = useNavigate();
  const groupTextRef = useRef();
  const [addGroupBox, setAddGroupBox] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const userId = Number.parseInt(sessionStorage.getItem('id'));

  useEffect(() => {
    handleGroupState(groupList.filter(group => group.id === selectedGroup));
  }, [selectedGroup]);

  useEffect(() => {
    Tasks.getSelectGroupsPromise().then(res => {
      const code = res.data.code;
      if (code === BusinessCode.GROUP_SELECT_SUCCESS) {
        const channelList = res.data.channelList;
        const groupList = channelList.map(channel => {
          return {
            id: channel.channelId,
            name: channel.channelName,
            owner: channel.ownerId,
            selected: false,
          };
        });
        if (groupList.length > 0) {
          groupList[0].selected = true;
          setGroupList(groupList);
          setSelectedGroup(groupList[0].id);
        }
      }
    });
  }, []);

  const addGroupList = useCallback(group => {
    setGroupList(prevState => {
      return prevState.concat(group);
    });
  }, []);

  const deleteGroupFromList = useCallback(groupId => {
    setGroupList(prevState => {
      return prevState.filter(group => group.id !== groupId);
    });
  }, []);

  const handleOnRemoveClick = useCallback((groupId, ownerId) => {
    if (userId === ownerId) {
      Tasks.getDeleteGroupsPromise(groupId).then(async res => {
        const code = res.data.code;
        if (code === BusinessCode.GROUP_DELETE_SUCCESS) {
          deleteGroupFromList(groupId);
        }
      });
    } else {
      AxiosGroupMemberTasks.getDeleteGroupMemberPromise(groupId).then(async res => {
        const code = res.data.code;
        if (code === BusinessCode.GROUP_MEMBER_DELETE_SUCCESS) {
          deleteGroupFromList(groupId);
        }
      });
    }
  }, []);

  const handleGroupAddClick = useCallback(() => {
    setAddGroupBox(!addGroupBox);
  }, []);

  const handleOnClickLogo = useCallback(() => {
    handleDisableSearchState();
    navigate('/');
  }, []);

  const handleOnSelectClick = useCallback(groupId => {
    if (selectedGroup === groupId) return;

    setGroupList(prevState => {
      return prevState.map(group => {
        if (group.id === groupId) return { ...group, selected: true };
        return { ...group, selected: false };
      });
    });
    setSelectedGroup(groupId);
  }, []);

  const handleOnClickAddGroupButton = useCallback(() => {
    const groupName = groupTextRef.current.value;
    Tasks.getInsertGroupsPromise(groupName)
      .then(response => {
        const code = response.data.code;
        // 전송후 잘 되었다면?
        if (code === BusinessCode.GROUP_INSERT_SUCCESS) {
          const channelId = response.data.channelId;
          addGroupList({ id: channelId, name: groupName, owner: userId, selected: false });
          setAddGroupBox(false);
        }
        // 전송후 실패 했다면?
      })
      .catch(err => {
        const errMessage = err.response.data.message;
        console.log(errMessage);
      });
  }, []);

  return (
    <div className={'left-side-bar-root'}>
      <div className={'main-logo'} onClick={handleOnClickLogo} />
      <div className={'group-list'}>
        {groupList.map(group => (
          <GroupButton
            key={group.id}
            groupKey={group.id}
            groupName={group.name}
            selected={group.selected}
            ownerId={group.owner}
            handleOnSelectClick={handleOnSelectClick}
            handleOnRemoveClick={handleOnRemoveClick}
          ></GroupButton>
        ))}
      </div>
      <div className={'add-group-box'}>
        {addGroupBox ? (
          <Fragment>
            <input className={'add-group-box-input'} type="text" ref={groupTextRef} />
            <div className={'add-group-box-button'} onClick={handleOnClickAddGroupButton} />
          </Fragment>
        ) : undefined}
      </div>
      <AddButton handleClick={handleGroupAddClick} />
    </div>
  );
};
export default LeftSideBar;

LeftSideBar.propTypes = {
  handleDisableSearchState: PropTypes.func.isRequired,
  handleGroupState: PropTypes.func.isRequired,
};
