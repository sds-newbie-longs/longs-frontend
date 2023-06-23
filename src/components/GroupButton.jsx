import React, { useState } from 'react';
import 'styles/GroupButton.scss';
import PropTypes from 'prop-types';

const GroupButton = props => {
  const groupKey = props.groupKey;
  const groupName = props.groupName;
  const selected = props.selected;
  const ownerId = props.ownerId;
  const handleOnRemoveClick = props.handleOnRemoveClick;
  const handleOnSelectClick = props.handleOnSelectClick;
  const [hover, setHover] = useState('');

  return (
    <div
      className={selected ? 'group-name-root-true' : 'group-name-root-false'}
      onMouseEnter={() => setHover('1')}
      onMouseLeave={() => setHover('')}
    >
      {selected ? <div className={'group-focus-tag'} /> : null}
      <p className={'group-name-p'} onClick={() => handleOnSelectClick(groupKey)}>
        {groupName}
      </p>
      <div
        className={hover !== '' ? 'group-remove' : 'group-none'}
        onClick={() => handleOnRemoveClick(groupKey, ownerId)}
      />
    </div>
  );
};
GroupButton.propTypes = {
  groupKey: PropTypes.number,
  groupName: PropTypes.string,
  selected: PropTypes.bool,
  ownerId: PropTypes.number,
  handleOnRemoveClick: PropTypes.func,
  handleOnSelectClick: PropTypes.func,
};

export default GroupButton;
