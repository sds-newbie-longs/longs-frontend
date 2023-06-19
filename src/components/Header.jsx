/* eslint-disable react/prop-types */
import React from 'react';
import 'styles/Header.scss';
import SearchField from 'components/common/SearchField';
import AddButton from 'components/common/AddButton';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Header = props => {
  const { handleOnSubmit } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleonSearchClick = data => {
    console.log('검색 클릭');
    setSearchParams({ search: data });
    handleOnSubmit();
    console.log(searchParams);
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

export default Header;
