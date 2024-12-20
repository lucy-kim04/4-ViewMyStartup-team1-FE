// 조형민

import axios from '../lib/axios';

export const getLatestSelections = async function (userId) {
  const res = await axios.get(`/api/users/${userId}/selections`);
  return res.data;
};
