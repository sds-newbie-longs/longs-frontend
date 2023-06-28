import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/video/VideoUrls';

const Tasks = {
  getDeleteVideoPromise: boardId => {
    return axios.delete(Urls.DELETE, { data: { boardId } });
  },
  getUploadBoardPromise: (channelId, boardId, title, description) => {
    boardId = Number.parseInt(boardId);
    return axios.post(
      Urls.POST + channelId + '/boards',
      {
        channelId,
        boardId,
        title,
        description,
      },
      { timeout: 0 },
    );
  },
  getVideoListByGroup: groupId => {
    const requestUrl = Urls.GET_VIDEO_LIST.replace('{groupId}', groupId);
    return axios.get(requestUrl);
  },

  getSearchVideoListById: (groupId, keyword) => {
    const requestUrl = Urls.GET_SEARCH_VIDEO_LIST.replace('{groupId}', groupId);
    return axios.get(requestUrl + keyword);
  },
  getVideoPromise: (groupId, boardId) => {
    const requestUrl = Urls.GET.replace('{groupId}', groupId).replace('{boardId}', boardId);
    return axios.get(requestUrl);
  },
};

export default Tasks;
