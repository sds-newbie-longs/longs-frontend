import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/upload/UploadUrls';

const Tasks = {
  getBeforeUploadPromise: boardId => {
    return axios.post(Urls.POST, { boardId });
  },
};

export default Tasks;
