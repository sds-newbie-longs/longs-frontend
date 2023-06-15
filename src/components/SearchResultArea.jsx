import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResultArea = props => {
  const mockData = [
    {
      id: '1',
      thumbnail_url:
        'https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMjAy/MDAxNjQzMTAyOTk2NjE0.gw_H_jjBM64svaftcnheR6-mHHlmGOyrr6htAuxPETsg.8JJSQNEA5HX2WmrshjZ-VjmJWqhmgE40Qm5csIud9VUg.JPEG.minziminzi128/IMG_7374.JPG?type=w800',
      title: 'docker.yml 보여준다',
      owner: 'din',
      description:
        '배포 하기 싫엉 하지만 딘만 할수있어 너가 해야해 니모가 찾아 딘 잘갔다와 오늘은 목요일 집에 가고싶어요',
    },
    {
      id: '2',
      thumbnail_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScY6NxLeZ7lgvgqu0b4z03S7GXzpoOMdFB41MAQEYQcQ&s',
      title: 'docker 말고 프론트앤드 하는 귀여운 개발자임요',
      owner: 'harry',
      description: '스트리밍 내가 해본다',
    },
    {
      id: '3',
      thumbnail_url:
        'https://www.sungkyul.ac.kr/sites/skumiso/atchmnfl/bbs/1384/thumbnail/temp_1637909879501100.jpg',
      title: '안녕하세요 나는 조용하지 않은 silence',
      owner: 'silence',
      description: '오늘도 심심해 다른 팀 염탐하고 와야징 또 돌아다닌다 귀여운 현호',
    },
  ];

  const [searchParams] = useSearchParams();
  const searchText =
    searchParams.get('search') !== null
      ? searchParams.get('search').toLowerCase()
      : searchParams.get('search');

  // 향후 query 결과 반영
  const searchResultList = mockData.filter(data => data.title.toLowerCase().includes(searchText));

  return (
    <div className={'search-result-root'}>
      {searchResultList.map(data => (
        <p className={'search-result-item'} key={data.id}>
          <span className={'search-result-thumbnail'} />
          <span className={'search-result-title'}> {data.title} </span>
          <span className={'search-result-owner'}> {data.owner} </span>
          <span className={'search-result-description'}> {data.description} </span>
        </p>
      ))}
      <br />
      {searchParams.get('search')}
    </div>
  );
};

export default SearchResultArea;
