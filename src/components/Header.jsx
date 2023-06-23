import React from 'react';
import 'styles/Header.scss';
import SearchField from 'components/common/SearchField';
import AddButton from 'components/common/AddButton';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = props => {
  const { handleOnSubmit, groupName, groupId } = props;

  const navigate = useNavigate();

  const handleOnSearchClick = data => {
    handleOnSubmit(data);
  };

  const handleOnUploadClick = () => {
    navigate('/upload', {
      state: {
        groupName,
        groupId,
      },
    });
  };

  return (
    <div className="app-header">
      <div className="app-header-search-field-wrapper">
        <SearchField
          isBordered={true}
          placeholder={'Search Videos'}
          handleOnSubmit={handleOnSearchClick}
        />
      </div>
      <div className="app-header-add-content-button-wrapper">
        <AddButton handleClick={handleOnUploadClick} />
      </div>
    </div>
  );
};

Header.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  groupName: PropTypes.string,
  groupId: PropTypes.number,
};

export default Header;
