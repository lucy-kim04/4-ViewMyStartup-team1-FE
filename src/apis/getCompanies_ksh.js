// 김세환

import axios from 'axios';

/**
 * 기업 전체 데이터를 가져오는 함수
 * @param {number} skip - 페이지네이션 시 건너뛸 개수
 * @param {number} limit - 반환할 데이터 개수 (최대 50)
 * @param {string} orderBy - 정렬 기준 (e.g., 'revenue', 'actualInvest', 'simInvest')
 * @param {string} searchString - 검색어
 * @returns {Promise<Object>} - 기업 전체 데이터
 */

export const fetchInvestments = async ({
  skip = 0,
  limit = 10,
  searchString = '',
  orderBy = 'lowestSimInvestment',
}) => {
  try {
    const response = await axios.get(
      `http://localhost:5500/api/ksh/companies`,
      {
        params: {
          skip,
          limit,
          searchString,
          orderBy,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch investments:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch investments',
    );
  }
};
