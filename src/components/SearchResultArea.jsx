import React, { useEffect, useState } from 'react';
import { ReactComponent as NoContentImg } from 'assets/noContents.svg';

import 'styles/SearchResultArea.scss';
import PropTypes from 'prop-types';
import Tasks from '../utils/axios/video/AxiosVideoTasks';
import BusinessCode from '../utils/common/BuisnessCode';

const SearchResultArea = props => {
  const { searchKeyword, groupId } = props;
  const [searchResultList, setSearchResultList] = useState([]);

  useEffect(() => {
    if (searchKeyword !== '') {
      Tasks.getSearchVideoListById(groupId, searchKeyword).then(res => {
        setSearchResultList([]);
        const code = res.data.code;
        if (code === BusinessCode.GET_SEARCH_VIDEO_LIST) {
          setSearchResultList(res.data.boardList);
        }
      });
    }
  }, [searchKeyword]);

  // 향후 query 결과 반영

  if (searchResultList.length === 0) {
    return (
      <div className={'search-result-root-empty'}>
        <NoContentImg />
        <p>There are no results {searchKeyword} including. </p>
      </div>
    );
  }
  return (
    <div className={'search-result-root'}>
      {searchResultList.map(data => (
        <p className={'search-result-item'} key={data.id}>
          <img className={'search-result-thumbnail'} src={data.thumbnail_url} />
          <div className={'search-result-info'}>
            <div className={'search-result-title'}> {data.title} </div>
            <div className={'search-result-owner'}> {data.owner} </div>
            <div className={'search-result-description'}> {data.description} </div>
          </div>
        </p>
      ))}
    </div>
  );
};

SearchResultArea.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  groupId: PropTypes.number.isRequired,
};
export default SearchResultArea;
