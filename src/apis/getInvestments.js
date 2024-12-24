// 김세환

import axios from '../lib/axios';

export const getInvestments = async function () {
  const res = await axios.get('/investments');
  return res.data;
}

