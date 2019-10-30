import axios from 'axios';
import { api_url } from '../core/constants';

export function callApiLogin(body) {
  return axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: `${api_url}/user/login?username=${body.username}&password=${body.password}`
  });
}
export function callApiRegister(body) {
  return axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: `${api_url}/user/register?username=${body.username}&password=${body.password}&email=${body.email}`
  });
}
