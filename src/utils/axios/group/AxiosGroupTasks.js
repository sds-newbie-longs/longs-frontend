import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/group/GroupUrls';

const Tasks = {
  getSelectGroupsPriomise: () => {
    return axios.get(Urls.GET);
  },
  getInsertGroupsPromise: groupName => {
    return axios.post(Urls.POST, { groupName });
  },
  getDeleteGroupsPromise: groupId => {
    return axios.delete(Urls.DELETE + '/' + groupId);
  },
};

export default Tasks;
