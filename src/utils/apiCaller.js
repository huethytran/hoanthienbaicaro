import axios from 'axios';
import { api_url } from '../core/constants';

export function callApiLogin(body) {
  return axios({
    method: 'POST',
    data: body,
    url: `${api_url}/user/login`
  });
}
export function callApiLoginFb(body) {
  return axios({
    method: 'POST',
    data: body,
    mode: 'cors',
    url: `${api_url}/user/facebook`
  });
}
export function callApiLoginGg(body) {
  return axios({
    method: 'POST',
    data: body,
    mode: 'cors',
    url: `${api_url}/user/google`
  });
}
export function callApiRegister(body) {
  return axios({
    method: 'POST',
    data: body,
    url: `${api_url}/user/register`
  });
}
export function callApiGetInfo() {
  console.log('token', localStorage.getItem('usertoken'));
  return axios({
    method: 'GET',
    url: `${api_url}/user/getinfo?token=${localStorage.getItem('usertoken')}`
  });
}
export function callApiChangePassword(body) {
  return axios({
    method: 'POST',
    data: { ...body, token: localStorage.getItem('usertoken') },
    url: `${api_url}/user/changepassword`
  });
}
export function callApiUpdateInfo(body) {
  return axios({
    method: 'POST',
    data: { ...body, token: localStorage.getItem('usertoken') },
    url: `${api_url}/user/updateinfo`
  });
}
export function callApiForgotPassword(body) {
  return axios({
    method: 'POST',
    data: body,
    url: `${api_url}/user/forgotpassword`
  });
}
export function callApiUploadAvatar(body) {
  return axios({
    method: 'POST',
    data: { imageUrl: body, token: localStorage.getItem('usertoken') },
    url: `${api_url}/user/uploadavatar`
  });
}
