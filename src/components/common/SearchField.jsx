import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchSvg from 'components/common/SearchSvg';
import 'styles/SearchField.scss';

const SearchField = props => {
  const { isBordered, placeholder, handleOnSubmit } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    searchParams.delete('search');
    navigate('/', { replace: true });
  }, []);

  const getContainerClassName = useCallback(() => {
    if (isBordered) return 'search-field-container-bordered';
    return 'search-field-container-borderless';
  }, []);

  const onSubmit = useCallback(data => {
    if (data.length !== 0) {
      handleOnSubmit(data);
      setSearchParams({ search: data });
      inputRef.current.value = '';
    }
  }, []);

  const onKeyDown = useCallback(evt => {
    if (evt.key === 'Enter') {
      onSubmit(evt.target.value);
    }
  }, []);

  const onSearchIconClick = useCallback(() => {
    onSubmit(inputRef.current.value);
  }, []);

  return (
    <div className={'search-field-root'}>
      <div className={getContainerClassName()}>
        <input
          className={'search-field-input'}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          ref={inputRef}
        />
        <SearchSvg className={'search-field-icon'} onClick={onSearchIconClick} />
      </div>
    </div>
  );
};

export default SearchField;

SearchField.propTypes = {
  isBordered: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
};
