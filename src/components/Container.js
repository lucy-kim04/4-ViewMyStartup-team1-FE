// 조형민

import './Container.css';

// body부분의 가로 사이즈를 설정하기 위한 wrap container
// 모든 page의 body를 Container 컴포넌트로 감싸주면 됨
export default function Container({ children }) {
  return <div className="container">{children}</div>;
}
