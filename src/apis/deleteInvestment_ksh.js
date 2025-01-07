// 김세환

import axios from '../lib/axios';

export const deleteInvestment = async ({ id, password }) => {
  console.log('investment id ', id);
  console.log('investment password ', password);
  try {
    const response = await axios.delete(`/api/ksh/investments/${id}`, {
      params: { password },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete investment:', error);
    throw new Error(
      error.response?.data?.error || 'Failed to delete investment'
    );
  }
};
