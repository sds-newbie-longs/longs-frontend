import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import 'styles/LeftSideBar.scss';
import GroupButton from 'components/GroupButton';
import AddButton from 'components/common/AddButton';
import Tasks from 'utils/axios/group/AxiosGroupTasks';
import BusinessCode from 'utils/common/BuisnessCode';
import AxiosGroupMemberTasks from '../utils/axios/group_member/AxiosGroupMemberTasks';

const LeftSideBar = props => {
  const { handleDisableSearchState } = props;
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
    if (props.userId === ownerId) {
      Tasks.getDeleteGroupsPromise(groupKey).then(async res => {
        const code = res.data.code;
        if (code === BusinessCode.GROUP_DELETE_SUCCESS) {
          await getGroupList(0);
        }
      });
    } else {
      AxiosGroupMemberTasks.getDeleteGroupMemberPromise(groupKey).then(async res => {
        const code = res.data.code;
        if (code === BusinessCode.GROUP_MEMBER_DELETE_SUCCESS) {
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
        {groupList.map(group => (
          <GroupButton
            key={group.channelId}
            groupKey={group.channelId}
            groupName={group.channelName}
            selected={group.select}
            ownerId={group.ownerId}
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
  userId: PropTypes.string.isRequired,
};
