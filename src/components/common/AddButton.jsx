import React from 'react';
import AddButtonSvg from 'components/common/AddButtonSvg';
import 'styles/AddButton.scss';
import PropTypes from 'prop-types';

const AddButton = props => {
  const { handleClick } = props;

  const onAddButtonClick = evt => {
    handleClick(evt);
  };

  return (
    <div className={'add-button-root'} onClick={onAddButtonClick}>
      <div className={'add-button-container'}>
        <AddButtonSvg className={'add-button-content'} />
      </div>
    </div>
  );
};

export default AddButton;
AddButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
