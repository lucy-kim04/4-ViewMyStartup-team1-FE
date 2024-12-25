// 조형민

import axios from '../lib/axios';

export const getCompanies_jhm = async function () {
  try {
    const res = await axios.get('/startups');
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.status}: ${error.response.data}`);
    } else {
      throw new Error('요청에 실패하였습니다.');
    }
  }
};
