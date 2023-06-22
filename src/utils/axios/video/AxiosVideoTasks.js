import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/video/VideoUrls';

const Tasks = {
  getDeleteVideoPromise: boardId => {
    return axios.delete(Urls.DELETE, { data: { boardId } });
  },
  getUploadBoardPromise: (channelId, videoUuid, title, description) => {
    return axios.post(Urls.POST, {
      channelId,
      videoUuid,
      title,
      description,
    });
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
    const requestUrl = Urls.GET_SEARCH_VIDEO_LIST.replace('{groupId}', groupId).replace(
      '{boardId}',
      boardId,
    );
    return axios.get(requestUrl);
  },
};

export default Tasks;
