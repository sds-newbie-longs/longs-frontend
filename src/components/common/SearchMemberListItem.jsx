import React from 'react';
import PropTypes from 'prop-types';
import 'styles/SearchMemberListItem.scss';
import SendPlusSvg from 'components/common/SendPlusSvg';

const SearchMemberListItem = props => {
  const { memberId, name, handleOnClick } = props;

  const onClick = evt => {
    handleOnClick(memberId, name, evt);
  };
  return (
    <div className={'search-member-list-item-root'}>
      <span className={'search-member-list-item-content'}>{name}</span>
      <div className={'search-member-list-item-icon-wrapper'} onClick={onClick}>
        <SendPlusSvg />
      </div>
    </div>
  );
};

export default SearchMemberListItem;
SearchMemberListItem.propTypes = {
  memberId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};
