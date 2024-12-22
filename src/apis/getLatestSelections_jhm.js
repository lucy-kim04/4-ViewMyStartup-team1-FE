// 조형민

import axios from '../lib/axios';

export const getLatestSelections_jhm = async function (userId) {
  const res = await axios.get(`/api/jhm/users/${userId}/selections`);
  return res.data;
};
