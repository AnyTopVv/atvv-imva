import axios from 'axios'
import { UserLoginParams, UserRegisterParams } from './type';

export const userLogin = (data: UserLoginParams) => {
  return axios({
    method: 'post',
    url: '/api/user/login',
    data: data,
    headers: {
      'Content-Type': 'application/json'
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

export const userRegister = (data: UserRegisterParams) => {
  return axios({
    method: 'post',
    url: '/api/user/register',
    data: data,
    headers: {
      'Content-Type': 'application/json'
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