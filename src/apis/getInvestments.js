// 김세환

import axios from 'axios';

/**
 * 투자 현황 데이터를 가져오는 함수
 * @param {number} skip - 페이지네이션 시 건너뛸 개수
 * @param {number} limit - 반환할 데이터 개수 (최대 50)
 * @param {string} searchString - 기업명 검색 문자열
 * @param {string} orderBy - 정렬 기준 (e.g., 'revenue', 'actualInvest', 'simInvest')
 * @param {string} sortOrder - 정렬 방향 ('asc' 또는 'desc')
 * @returns {Promise<Object>} - 투자 현황 데이터
 */

export const fetchInvestments = async ({
  skip = 0,
  limit = 10,
  searchString = '',
  orderBy = 'actualInvest',
  sortOrder = 'desc',
}) => {
  try {
    const response = await axios.get('http://localhost:4000/api/investments', {
      params: {
        skip,
        limit,
        searchString,
        orderBy,
        sortOrder,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch investments:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch investments',
    );
  }
};
