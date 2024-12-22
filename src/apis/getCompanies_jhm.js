// 조형민

import axios from '../lib/axios';

export const getCompanies_jhm = async function () {
  const res = await axios.get('/startups');
  return res.data;
};
