// 조형민

import axios from '../lib/axios';

export const updateCompany = async function (companyId, companyData) {
  const res = await axios.patch(`/api/companies/${companyId}`, companyData);
  return res.data;
};
