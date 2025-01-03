import { useState } from 'react';
import './CompanyInvestmentModal.css';


const InvestmentModal = ({ company, investment, onClose }) => {
    return (
        <div className="investment-modal">
            <div className="investment-modal-top-section">
                <p>기업에 투자하기</p>
                <button onClick={onClose}>X</button>
            </div>
            <div className="investment-modal-section">
                <p>투자 기업 정보</p>
                <div className="investment-modal-company-info">
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/37e7be51-44e0-4b80-8339-9f4f80026dfb/d2wh0s0-b74aa555-26e4-4602-9cb2-ad5478571ceb.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM3ZTdiZTUxLTQ0ZTAtNGI4MC04MzM5LTlmNGY4MDAyNmRmYlwvZDJ3aDBzMC1iNzRhYTU1NS0yNmU0LTQ2MDItOWNiMi1hZDU0Nzg1NzFjZWIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.S5VQABzZ-z_IWPqYMn68CXZEnsE4f4KEIAhQe7Pq5Fs" />
                    <h5>기업 이름</h5>
                    <h6>기업 카테고리</h6>
                </div>
            </div>
            <div className="investment-modal-section">
                <p>투자자 이름</p>
                <input type="text" />
            </div>
            <div className="investment-modal-section">
                <p>투자 금액</p>
                <input type="text" />
            </div>
            <div className="investment-modal-section">
                <p>투자 코멘트</p>
                <input type="text" />
            </div>
            <div className="investment-modal-section">
                <p>비밀번호</p>
                <input type="password" />
            </div>
            <div className="investment-modal-section">
                <p>비밀번호 확인</p>
                <input type="password" />
            </div>
            <div className="investment-modal-bottom-section">
                <button className="investment-modal-cancel-button">취소</button>
                <button className="investment-modal-invest-button">투자하기</button>
            </div>
        </div>


    )
};

export default InvestmentModal;