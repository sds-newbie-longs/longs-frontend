import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/video/VideoUrls';

const Tasks = {
  getDeleteVideoPromise: boardId => {
    return axios.delete(Urls.DELETE, { data: { boardId } });
  },
  getUploadBoardPromise: (channelId, videoUuid, title, description) => {
    return axios.post(
      Urls.POST + channelId + '/boards',
      {
        channelId,
        videoUuid,
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
};

export default Tasks;
