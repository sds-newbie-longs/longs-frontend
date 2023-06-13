import React from 'react';
import 'styles/Header.scss';
import SearchField from './common/SearchField';
import AddButton from './common/AddButton';
const Header = () => {
  const handleOnSubmit = () => {};
  const handleonSearchClick = () => {
    console.log('검색 클릭');
  };
  return (
    <div className="app-header">
      <div className="app-header-search-field-wrapper">
        <SearchField
          isBordered={true}
          placeholder={'Search Videos'}
          handleOnSubmit={handleOnSubmit}
        />
      </div>
      <div className="app-header-add-content-button-wrapper">
        <AddButton width={30} height={30} handleClick={handleonSearchClick} />
      </div>
    </div>
  );
};

export default Header;
