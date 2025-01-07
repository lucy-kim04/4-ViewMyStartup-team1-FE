// 김세환

import React from 'react';
import { useState, useEffect } from 'react';
import './CompanyInvestmentModal.css';
import { postInvestment } from '../apis/postInvestment_ksh';
import InvestmentSuccessModal from './InvestmentSuccessModal';

const CompanyInvestmentModal = ({
  company,
  investment,
  onClose,
  onClickInvest,
}) => {
  const [investorName, setInvestorName] = useState(
    investment ? investment.name : ''
  );
  const [investmentAmount, setInvestmentAmount] = useState(
    investment ? investment.amount : ''
  );
  const [investmentComment, setInvestmentComment] = useState(
    investment ? investment.comment : ''
  );
  const [investmentPassword, setInvestmentPassword] = useState('');
  const [investmentPasswordConfirm, setInvestmentPasswordConfirm] =
    useState('');
  const [isInvestmentSuccessful, setIsInvestmentSuccessful] = useState(false);

  const handleSetName = (name) => {
    setInvestorName(name);
  };

  const handleSetAmount = (amount) => {
    if (isNaN(amount)) {
      alert('숫자만 입력해주세요');
      return;
    }
    setInvestmentAmount(amount);
  };

  const handleSetComment = (comment) => {
    setInvestmentComment(comment);
  };

  const handleSetPassword = (password) => {
    setInvestmentPassword(password);
  };

  const handleSetPasswordConfirm = (confirmPassword) => {
    setInvestmentPasswordConfirm(confirmPassword);
  };

  const handleInvestment = () => {
    if (
      !investorName ||
      !investmentAmount ||
      !investmentComment ||
      !investmentPassword ||
      !investmentPasswordConfirm
    ) {
      alert('모든 항목을 입력해주세요');
      return;
    } else if (investmentAmount < 0 || isNaN(investmentAmount)) {
      alert('금액은 0 이상의 숫자만 입력해주세요');
      return;
    } else if (investmentPassword !== investmentPasswordConfirm) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
    postInvestmentData();
    onClickInvest();
  };

  const postInvestmentData = async () => {
    try {
      await postInvestment({
        name: investorName,
        amount: parseInt(investmentAmount),
        comment: investmentComment,
        password: investmentPassword,
        passwordConfirmation: investmentPasswordConfirm,
        user: {
          id: '1ef3627b-ea92-4c9e-8562-ea7b27a49a0a',
          name: investorName,
        },
        company: {
          id: company.id,
          name: company.name,
          category: company.category,
          imageUrl: company.imageUrl,
        },
      });
      setIsInvestmentSuccessful(true);
    } catch (error) {
      console.error('Failed to post investment:', error);
    }
  };

  const handleSuccessClose = () => {
    setIsInvestmentSuccessful(false);
    onClose();
  };

  useEffect(() => {
    const nameWarning = document.querySelector(
      '.ksh-investment-modal-name-section h5'
    );
    const amountWarning = document.querySelector(
      '.ksh-investment-modal-amount-section h5'
    );
    const commentWarning = document.querySelector(
      '.ksh-investment-modal-comment-section h5'
    );
    const passwordWarning = document.querySelector(
      '.ksh-investment-modal-password-section h5'
    );
    const passwordConfirmWarning = document.querySelector(
      '.ksh-investment-modal-password-confirm-section h5'
    );

    if (nameWarning) {
      nameWarning.style.display = investorName ? 'none' : 'block';
    }
    if (amountWarning) {
      amountWarning.style.display = investmentAmount ? 'none' : 'block';
    }
    if (commentWarning) {
      commentWarning.style.display = investmentComment ? 'none' : 'block';
    }
    if (passwordWarning) {
      passwordWarning.style.display = investmentPassword ? 'none' : 'block';
    }
    if (passwordConfirmWarning) {
      passwordConfirmWarning.style.display = investmentPasswordConfirm
        ? 'none'
        : 'block';
    }
  }, [
    investorName,
    investmentAmount,
    investmentComment,
    investmentPassword,
    investmentPasswordConfirm,
  ]);

  if (isInvestmentSuccessful) {
    return <InvestmentSuccessModal onClose={handleSuccessClose} />;
  }

  return (
    <div className="ksh-investment-modal" onClick={(e) => e.stopPropagation()}>
      <div className="ksh-investment-modal-top-section">
        <p>기업에 투자하기</p>
        <button className="ksh-investment-modal-close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="ksh-investment-modal-section">
        <p>투자 기업 정보</p>
        <div className="ksh-investment-modal-company-info">
          <img
            src={company.imageUrl || 'https://via.placeholder.com/150'}
            alt={company.name}
          />
          <h5>{company.name || '기업 이름'}</h5>
          <h6>{company.category || '카테고리'}</h6>
        </div>
      </div>
      <div className="ksh-investment-modal-section">
        <div className="ksh-investment-modal-name-section">
          <p>투자자 이름</p>
          <h5>투자자 이름을 입력해 주세요</h5>
        </div>
        <input
          placeholder="투자자 이름을 입력해 주세요"
          type="text"
          defaultValue={investorName}
          onBlur={(e) => handleSetName(e.target.value)}
        />
      </div>
      <div className="ksh-investment-modal-section">
        <div className="ksh-investment-modal-amount-section">
          <p>투자 금액</p>
          <h5>투자 금액을 입력해 주세요</h5>
        </div>
        <input
          placeholder="투자 금액을 입력해 주세요"
          type="text"
          defaultValue={investmentAmount}
          onBlur={(e) => handleSetAmount(e.target.value)}
        />
      </div>
      <div className="ksh-investment-modal-section">
        <div className="ksh-investment-modal-comment-section">
          <p>투자 코멘트</p>
          <h5>투자 코멘트를 입력해 주세요</h5>
        </div>
        <textarea
          className="ksh-investment-comment"
          placeholder="투자 코멘트를 입력해 주세요"
          type="text"
          defaultValue={investmentComment}
          onBlur={(e) => handleSetComment(e.target.value)}
        />
      </div>
      <div className="ksh-investment-modal-section">
        <div className="ksh-investment-modal-password-section">
          <p>비밀번호</p>
          <h5>비밀번호를 입력해주세요</h5>
        </div>
        <input
          placeholder="비밀번호를 입력해주세요"
          className="ksh-password"
          type="password"
          defaultValue={investmentPassword}
          onBlur={(e) => handleSetPassword(e.target.value)}
        />
      </div>
      {!investment && (
        <div className="ksh-investment-modal-section">
          <div className="ksh-investment-modal-password-confirm-section">
            <p>비밀번호 확인</p>
            <h5>비밀번호를 다시 한 번 입력해주세요</h5>
          </div>
          <input
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            className="ksh-password-confirm"
            type="password"
            defaultValue={investmentPasswordConfirm}
            onBlur={(e) => handleSetPasswordConfirm(e.target.value)}
          />
          <div className="ksh-password-mismatch-warning-section">
            {investmentPassword !== investmentPasswordConfirm && (
              <h5>비밀번호가 일치하지 않습니다</h5>
            )}
          </div>
        </div>
      )}
      <div className="ksh-investment-modal-bottom-section">
        <button
          className="ksh-investment-modal-cancel-button"
          onClick={onClose}
        >
          취소
        </button>
        <button
          className="ksh-investment-modal-invest-button"
          onClick={handleInvestment}
        >
          {investment ? '수정하기' : '투자하기'}
        </button>
      </div>
    </div>
  );
};
export default CompanyInvestmentModal;
