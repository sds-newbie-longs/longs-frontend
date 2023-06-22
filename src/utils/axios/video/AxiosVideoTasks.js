import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/video/VideoUrls';

const Tasks = {
  getDeleteVideoPromise: boardId => {
    return axios.delete(Urls.DELETE, { data: { boardId } });
  },
  getVideoListByGroup: groupId => {
    const requestUrl = Urls.GET_VIDEO_LIST.replace('{groupId}', groupId);
    return axios.get(requestUrl);
  },
};

export default Tasks;
