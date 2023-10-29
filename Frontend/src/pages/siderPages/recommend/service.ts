import axios from 'axios'

export const getRecommendPageVideo = () => {
  return axios({
    method: 'get',
    url: '/video/getRecommendPageVideo',
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
