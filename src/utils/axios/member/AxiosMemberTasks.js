import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/member/MemberUrls';

const Tasks = {
  getMembersPromise: () => {
    return axios.get(Urls.GET);
  },

  getSearchPromise: keyword => {
    return axios.post(Urls.SEARCH, { keyword });
  },

  getInviteMemberPromise: id => {
    return axios.post(Urls.INVITE, { id });
  },

  getMemberIdPromise: username => {
    return axios.get(Urls.ID);
  },

  getSignInPromise: username => {
    return axios.post(Urls.SIGN_IN, { username });
  },
};

export default Tasks;
