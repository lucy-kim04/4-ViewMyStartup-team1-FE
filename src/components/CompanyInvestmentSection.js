import { useParams } from 'react-router-dom';
import { INVESTMENTS, COMPANIES, USERS } from '../db/companyMock';
import './CompanyInvestmentSection.css';

export default function CompanyInvestmentSection({ companyId }) {
  //그리드 구현용 임시 db 사용.. 도저히...

  const mockInvestments = [
    {
      investorName: '김투자',
      rank: 1,
      amount: 500200000,
      comment: '성장 가능성이 높아 보입니다.',
    },
    {
      investorName: '이사장',
      rank: 2,
      amount: 3000000300,
      comment: '좋은 비즈니스 모델입니다.',
    },
    {
      investorName: '박대표',
      rank: 3,
      amount: 20000000200,
      comment: '훌륭한 팀과 기술력을 보유했습니다.',
    },
    {
      investorName: '한대표',
      rank: 4,
      amount: 2000000300,
      comment: '훌륭한 팀과 기술력을 보유했습니다.',
    },
    {
      investorName: '왕투자',
      rank: 5,
      amount: 2320000000,
      comment: '훌륭한 팀과 기술력을 보유했습니다.',
    },
  ];

  const formatToKoreanBillion = amount => {
    return (amount / 100000000).toLocaleString();
  };

  return (
    <div className="company-investment-section">
      <h1 className="table-title">View My Startup에서 받은 투자</h1>
      <div className="divider" />
      <p className="investment-sum">총 200억원</p>
      <table className="data-table">
        <thead>
          <tr>
            <th>투자자 이름</th>
            <th>순위</th>
            <th>투자금액</th>
            <th>투자 코멘트</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mockInvestments.map((inv, index) => (
            <tr key={index}>
              <td>{inv.investorName}</td>
              <td>{inv.rank}위</td>
              <td>{formatToKoreanBillion(inv.amount)}억</td>
              <td>{inv.comment}</td>
              <td>
                <button className="more-button">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
