import React from 'react';
import 'styles/Header.scss';
import SearchField from 'components/common/SearchField';
import AddButton from 'components/common/AddButton';
import { useNavigate } from 'react-router';
const Header = () => {
  const navigate = useNavigate();
  const handleonSearchClick = () => {
    console.log('검색 클릭');
  };
  const handleOnUploadClick = () => {
    navigate('/upload');
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
        <AddButton width={30} height={30} handleClick={handleOnUploadClick} />
      </div>
    </div>
  );
};

export default Header;
