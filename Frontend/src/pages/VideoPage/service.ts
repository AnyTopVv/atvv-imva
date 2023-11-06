import axios from 'axios'

export const getVideoDetail = (params: any) => {
  return axios({
    method: 'get',
    url: '/api/video/detail',
    params: params,
    headers: {
      'Authorization': localStorage.getItem('access_token'),
    },
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

export const likeVideo = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/video/likes/operate',
    data: data,
    headers: {
      'Authorization': localStorage.getItem('access_token'),
    },
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

export const starVideo = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/video/stars/operate',
    data: data,
    headers: {
      'Authorization': localStorage.getItem('access_token'),
    },
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

export const getVideoComments = (params: any) => {
  return axios({
    method: 'get',
    url: '/api/video/comment/list',
    params: params,
    headers: {
      'Authorization': localStorage.getItem('access_token'),
    },
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

export const addComment = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/video/comment/add',
    data: data,
    headers: {
      'Authorization': localStorage.getItem('access_token'),
    },
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

export const likeComment = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/video/comment/like',
    data: data,
    headers: {
      'Authorization': localStorage.getItem('access_token'),
    },
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
