import Tasks from 'utils/axios/member/AxiosMemberTasks';
import BusinessCode from 'utils/common/BuisnessCode';

const check = () => {
  return new Promise((resolve, reject) =>
    Tasks.getMemberIdPromise()
      .then(res => {
        const code = res.data.code;
        if (code === BusinessCode.INFO_SUCCESS) {
          const body = res.data;
          const username = body.username;
          const id = body.id;

          sessionStorage.setItem('username', username);
          sessionStorage.setItem('id', id);
          resolve();
        } else reject(new Error(res.data.message));
      })
      .catch(reason => reject(reason)),
  );
};

export default check;
