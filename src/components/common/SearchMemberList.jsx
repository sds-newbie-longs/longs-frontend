import React from 'react';
import PropTypes from 'prop-types';
import SearchMemberListItem from 'components/common/SearchMemberListItem';
import 'styles/SearchMemberList.scss';

const SearchMemberList = props => {
  const { resultList, handleOnInvited } = props;

  const onSendIconClick = (id, name, evt) => {
    // todo: move callback to then
    // Tasks.getInviteMemberPromise(id).then(res => res.data);
    handleOnInvited(id, name);
  };

  return (
    <div className={'search-member-list-root'}>
      {resultList.map(member => {
        return (
          <SearchMemberListItem
            id={member.id}
            name={member.username}
            key={member.id}
            handleOnClick={onSendIconClick}
          />
        );
      })}
    </div>
  );
};

export default SearchMemberList;
SearchMemberList.propTypes = {
  resultList: PropTypes.array.isRequired,
  handleOnInvited: PropTypes.func.isRequired,
};
