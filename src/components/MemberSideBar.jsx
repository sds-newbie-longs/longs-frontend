import React, { useCallback, useEffect, useState } from 'react';
import SearchField from 'components/common/SearchField';
import MemberInfoList from 'components/MemberInfoList';
import 'styles/MemberSideBar.scss';
import PropTypes from 'prop-types';
import SearchMemberList from 'components/common/SearchMemberList';
import Tasks from 'utils/axios/group_member/AxiosGroupMemberTasks';
import BusinessCode from 'utils/common/BuisnessCode';

const MemberSideBar = props => {
  const { groupId } = props;
  const [searchResult, setSearchResult] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    groupMemberSelect();
  }, [groupId]);

  const groupMemberSelect = () => {
    if (groupId === -1) {
      Tasks.getGroupMembersPromise(groupId).then(res => {
        const code = res.data.code;
        if (code === BusinessCode.GROUP_MEMBER_SELECT_SUCCESS) {
          setMembers(res.data.memberList);
        }
      });
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

  const askServer = useCallback(keyword => {
    // Tasks.getSearchPromise(keyword).then(res => res.data);
    groupMemberSearch();
    const lastId = searchResult.length === 0 ? 0 : searchResult[searchResult.length - 1].id;
    setSearchResult(prevState => [...prevState, { id: lastId + 1, username: keyword }]);
  }, []);

  const onInvited = useCallback((id, username) => {
    setSearchResult(() => []);
    setMembers(prevState => [...prevState, { id, username }]);
    // 초대 및 다시 조회하기
  }, []);

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
    </div>
  );
};

export default MemberSideBar;
MemberSideBar.propTypes = {
  groupId: PropTypes.number,
};
