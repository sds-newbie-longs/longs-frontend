import React, { useState } from 'react';
import '../styles/GroupButton.scss';
import PropTypes from 'prop-types';
const GroupButton = props => {
  const groupName = props.groupName;
  const selected = props.selected;
  const handleOnRemoveClick = props.handleOnRemoveClick;
  const [hover, setHover] = useState('');

  return (
    <div
      className={selected ? 'group-name-root-true' : 'group-name-root-false'}
      onMouseEnter={() => setHover('1')}
      onMouseLeave={() => setHover('')}
    >
      {selected ? <div className={'group-focus-tag'} /> : null}
      <p className={'group-name-p'}>{groupName}</p>
      <div
        className={hover !== '' ? 'group-remove' : 'group-none'}
        onClick={() => handleOnRemoveClick()}
      />
    </div>
  );
};
GroupButton.propTypes = {
  groupName: PropTypes.string,
  selected: PropTypes.bool,
  handleOnRemoveClick: PropTypes.func,
};

export default GroupButton;
