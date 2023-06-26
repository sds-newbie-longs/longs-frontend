import React from 'react';
import 'styles/Header.scss';
import SearchField from 'components/common/SearchField';
import AddButton from 'components/common/AddButton';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = props => {
  const { handleOnSubmit } = props;

  const navigate = useNavigate();

  const handleonSearchClick = data => {
    console.log('검색 클릭');
    handleOnSubmit(data);
  };

  const handleOnUploadClick = () => {
    navigate('/upload', {
      state: {
        groupId: 1,
        groupName: 'Knox SER',
      },
    });
    console.log('업로드 클릭');
  };

  return (
    <div className="app-header">
      <div className="app-header-search-field-wrapper">
        <SearchField
          isBordered={true}
          placeholder={'Search Videos'}
          handleOnSubmit={handleonSearchClick}
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
};

export default Header;
