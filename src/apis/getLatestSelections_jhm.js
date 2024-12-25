// 조형민

import axios from '../lib/axios';

export const getLatestSelections_jhm = async function (userId) {
  try {
    const res = await axios.get(`/api/jhm/users/${userId}/selections`);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.status}: ${error.response.data}`);
    } else {
      throw new Error('요청에 실패하였습니다.');
    }
  }
};
