// 조형민

import axios from '../lib/axios';

export const updateCompany_jhm = async function (companyId, companyData) {
  const res = await axios.patch(`/api/jhm/companies/${companyId}`, companyData);
  return res.data;
};
