// 조형민

import axios from '../lib/axios';

// 기업 순위 조회하기(인접한 상하위 2개의 기업 포함 총 5개 기업 정보 조회)//
export const getCompanyRank = async function (companyId) {
  const res = await axios.get(`/api/companies/${companyId}/rank`);
  return res.data;
};
