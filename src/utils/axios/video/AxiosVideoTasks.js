import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/video/VideoUrls';

const Tasks = {
  getDeleteVideoPromise: boardId => {
    return axios.delete(Urls.DELETE, { data: { boardId } });
  },
};

export default Tasks;
