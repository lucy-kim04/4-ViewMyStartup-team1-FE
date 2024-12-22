// 조형민

import axios from '../lib/axios';

export const updateUser_jhm = async function (userId, userData) {
  const res = await axios.patch(`/api/users/${userId}`, userData);
  return res.data;
};
