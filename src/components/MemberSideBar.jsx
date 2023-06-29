import React, { useCallback, useEffect, useState } from 'react';
import SearchField from 'components/common/SearchField';
import MemberInfoList from 'components/MemberInfoList';
import 'styles/MemberSideBar.scss';
import PropTypes from 'prop-types';
import SearchMemberList from 'components/common/SearchMemberList';
import Tasks from 'utils/axios/group_member/AxiosGroupMemberTasks';
import BusinessCode from 'utils/common/BuisnessCode';
import { useNavigate } from 'react-router';

const MemberSideBar = props => {
  const { groupId } = props;
  const [searchResult, setSearchResult] = useState([]);
  const [members, setMembers] = useState([]);
  const [search, SetSearch] = useState('');
  const [selectedId, SetSelectedId] = useState(0);
  const navigator = useNavigate();

  useEffect(() => {
    document.onclick = evt => {
      const classList = evt.target.classList;
      const contains = classList.contains('search-member-list-item-root');
      if (!contains) setSearchResult([]);
    };
  }, []);

  useEffect(() => {
    groupMemberSelect();
  }, [groupId]);

  useEffect(() => {
    if (search.trim() !== '') {
      groupMemberSearch(search);
    }
  }, [search]);

  useEffect(() => {
    if (selectedId !== 0) {
      groupMemberInvited(selectedId);
      groupMemberSelect();
    }
  }, [selectedId]);

  const groupMemberSelect = () => {
    if (groupId !== -1) {
      // 선택된 업로드가 없는 경우
      Tasks.getGroupMembersPromise(groupId)
        .then(res => {
          const code = res.data.code;
          if (code === BusinessCode.GROUP_MEMBER_SELECT_SUCCESS) {
            setMembers(res.data.memberList);
          }
        })
        .catch(reason => console.log(reason));
    }
  };
  const groupMemberSearch = keyword => {
    Tasks.getSearchGroupMemberPromise(groupId, keyword).then(res => {
      const code = res.data.code;
      if (code === BusinessCode.GROUP_MEMBER_SEARCH_SUCCESS) {
        setSearchResult(res.data.searchList);
      }
    });
  };

  const askServer = keyword => {
    SetSearch(keyword);
  };

  const groupMemberInvited = id => {
    Tasks.getInviteGroupMemberPromise(groupId, id).then(async res => {
      const code = res.data.code;
      if (code === BusinessCode.GROUP_INVITE_SUCCESS) {
        await groupMemberSelect();
      }
    });
  };

  const onInvited = useCallback((id, username) => {
    setSearchResult(() => []);
    // 초대 및 다시 조회하기
    SetSelectedId(id);
  }, []);

  const handleLogoutButton = () => {
    navigator('/login');
  };

  return (
    <div className={'member-side-bar-root'}>
      <div className={'member-side-bar-search-field-container'}>
        <SearchField isBordered={false} placeholder={'Search Members'} handleOnSubmit={askServer} />
        <div className={'member-side-bar-search-result'}>
          <SearchMemberList resultList={searchResult} handleOnInvited={onInvited} />
        </div>
      </div>
      <div className={'member-side-bar-member-list-container'}>
        <span className={'member-side-bar-member-count'}>Members - {members.length}</span>
        <hr />
        <MemberInfoList members={members} />
      </div>
      <div className={'logout-button'} onClick={handleLogoutButton}>
        logout
      </div>
    </div>
  );
};

export default MemberSideBar;
MemberSideBar.propTypes = {
  groupId: PropTypes.number,
};
