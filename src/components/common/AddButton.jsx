import React from 'react';
import AddButtonSvg from 'components/common/AddButtonSvg';
import 'styles/AddButton.scss';
import PropTypes from 'prop-types';

const AddButton = props => {
  const { width, height, handleClick } = props;

  const onAddButtonClick = evt => {
    handleClick(evt);
  };

  return (
    <div className={'add-button-root'}>
      <div className={'add-button-container'}>
        <AddButtonSvg
          width={width}
          height={height}
          className={'add-button-content'}
          onClick={onAddButtonClick}
        />
      </div>
    </div>
  );
};

export default AddButton;
AddButton.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
