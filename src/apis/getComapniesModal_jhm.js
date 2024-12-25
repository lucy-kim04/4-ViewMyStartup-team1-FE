// 조형민

import axios from '../lib/axios';

export const getCompaniesModal_jhm = async function ({
  orderBy = 'name',
  skip = 0,
  limit = 5,
  searchString = '',
}) {
  try {
    const query = `orderBy=${orderBy}&skip=${skip}&searchString=${searchString}&limit=${limit}`;
    const res = await axios.get(`/api/jhm/companies?${query}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.status}: ${error.response.data}`);
    } else {
      throw new Error('요청에 실패하였습니다.');
    }
  }
};
