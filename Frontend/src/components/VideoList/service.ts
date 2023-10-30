import axios from 'axios'

export const getOtherPageVideo = (_params: any) => {
  return axios({
    method: 'get',
    url: '/video/getRecommendPageVideo',
    // params: params,
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
