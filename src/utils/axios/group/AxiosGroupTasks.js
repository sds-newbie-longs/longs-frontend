import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/group/GroupUrls';

const Tasks = {
  getSelectGroupsPromise: () => {
    return axios.get(Urls.GET);
  },
  getInsertGroupsPromise: name => {
    return axios.post(Urls.POST, { name });
  },
  getDeleteGroupsPromise: groupId => {
    return axios.delete(Urls.DELETE + '/' + groupId);
  },
};

export default Tasks;
