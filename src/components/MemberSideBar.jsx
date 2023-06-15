import React, { useCallback, useState } from 'react';
import SearchField from 'components/common/SearchField';
import MemberInfoList from 'components/MemberInfoList';
import 'styles/MemberSideBar.scss';
import PropTypes from 'prop-types';
import SearchMemberList from 'components/common/SearchMemberList';

const MemberSideBar = props => {
  const { memberList } = props;
  const [searchResult, setSearchResult] = useState([]);
  const [members, setMembers] = useState(memberList);

  const askServer = useCallback(keyword => {
    // Tasks.getSearchPromise(keyword).then(res => res.data);
    const lastId = searchResult.length === 0 ? 0 : searchResult[searchResult.length - 1].id;
    setSearchResult(prevState => [...prevState, { id: lastId + 1, name: keyword }]);
  }, []);

  const onInvited = useCallback((id, name) => {
    setSearchResult(() => []);
    setMembers(prevState => [...prevState, { id, name }]);
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
  memberList: PropTypes.array.isRequired,
};
