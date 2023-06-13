import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/video/VideoUrls';

const Tasks = {
  getDeleteVideoPromise: () => {
    return axios.delete(Urls.DELETE);
  },
};

export default Tasks;
