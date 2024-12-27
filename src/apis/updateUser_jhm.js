// 조형민

import axios from '../lib/axios';

export const updateUser_jhm = async function (userId, userData) {
  try {
    const res = await axios.patch(`/api/jhm/users/${userId}`, userData);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.status}: ${error.response.data}`);
    } else {
      throw new Error('요청에 실패하였습니다.');
    }
  }
};
