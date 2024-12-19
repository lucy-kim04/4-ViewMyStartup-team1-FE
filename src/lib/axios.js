// 조형민(공통)

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:5500',
});

export default instance;
