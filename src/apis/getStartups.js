import axios from '../lib/axios';

export const getStartups = async function () {
  const res = await axios.get('/startups');
  return res.data;
};
