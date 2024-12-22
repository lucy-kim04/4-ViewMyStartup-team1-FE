// 조형민

import axios from '../lib/axios';

// 기업 순위 조회하기(인접한 상하위 2개의 기업 포함 총 5개 기업 정보 조회)//
export const getCompanyRank_jhm = async function (
  companyId,
  orderBy = 'highestSales',
) {
  const res = await axios.get(
    `/api/companies/${companyId}/rank?orderBy=${orderBy}`,
  );
  return res.data;
};
