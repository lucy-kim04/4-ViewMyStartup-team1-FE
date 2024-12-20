// 조형민

import axios from '../lib/axios';

export const getCompanies = async function () {
  const res = await axios.get('/startups');
  return res.data;
};
