// 조형민(공통)

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://four-viewmystartup-team1-be-ztmf.onrender.com',
  // baseURL: 'http://localhost:5500',
});

export default instance;
