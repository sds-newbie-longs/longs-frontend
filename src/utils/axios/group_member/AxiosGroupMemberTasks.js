import axios from 'utils/axios/AxiosInstance';
import Urls from 'utils/axios/group_member/GroupMemberUrls';

const Tasks = {
  getInviteGroupMemberPromise: (channelId, memberId) => {
    return axios.post(Urls.INVITE, { channelId, memberId });
  },

  getGroupMembersPromise: groupId => {
    return axios.get(Urls.GET + '/' + groupId);
  },

  getDeleteGroupMemberPromise: groupId => {
    return axios.delete(Urls.DELETE + '/' + groupId);
  },

  getSearchGroupMemberPromise: (groupId, keyword) => {
    return axios.get(Urls.SEARCH + '/' + groupId + '/search?keyword=' + keyword);
  },
};

export default Tasks;
