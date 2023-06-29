const Urls = {
  DELETE: '/groups/{groupId}/boards/{boardId}',
  POST: '/groups/',
  GET: '/groups/{groupId}/boards/{boardId}',
  GET_VIDEO_LIST: '/groups/{groupId}/boards/boardList',
  GET_SEARCH_VIDEO_LIST: '/groups/{groupId}/boards/search?keyword=',
  HIGH_SCALE: '/upload/',
};
Object.freeze(Urls);

export default Urls;
