import axios from 'axios'

export const getVideoDetail = (params: any) => {
  return axios({
    method: 'get',
    url: '/api/video/detail',
    params: params,
  }).then(res => {
    if (res && res.status === 200) {
      return res;
    } else {
      console.log(res);
    }
  }).catch(err => {
    console.log(err)
  });
};
