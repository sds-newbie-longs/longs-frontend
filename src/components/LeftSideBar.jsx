import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import 'styles/LeftSideBar.scss';
import GroupButton from 'components/GroupButton';
import AddButton from 'components/common/AddButton';
import Tasks from 'utils/axios/group/AxiosGroupTasks';
import BusinessCode from 'utils/common/BuisnessCode';

const LeftSideBar = props => {
  const { handleDisableSearchState } = props;
  const navigate = useNavigate();
  const groupTextRef = useRef();
  const [addGroupBox, setAddGroupBox] = useState(false);
  const [groupList, setGroupList] = useState([]);
  console.log('left side bar');

  useEffect(() => {
    getGroupList();
  }, []);

  const getGroupList = () => {
    Tasks.getSelectGroupsPromise()
      .then(res => {
        const code = res.data.code;
        if (code === BusinessCode.GROUP_SELECT_SUCCESS) {
          let groupList = res.data.channelList;
          groupList = groupList.map(g => {
            return { ...g, selected: false };
          });
          groupList[0].selected = true;
          setGroupList(groupList);
        }
      })
      .catch(reason => console.log(reason));
  };
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

  const handleOnSelectClick = useCallback(() => {
    console.log(groupList);
  }, []);

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
  handleGroupIdState: PropTypes.func.isRequired,
};
