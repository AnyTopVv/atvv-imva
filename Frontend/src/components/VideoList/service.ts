import axios from 'axios'

export const getOtherPageVideo = (params: any) => {
  return axios({
    method: 'get',
    url: '/api/video/getRecommendPageVideo',
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
