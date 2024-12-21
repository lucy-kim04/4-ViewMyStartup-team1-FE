// 조형민

import './AlertModal.css';
import icDelete from '../assets/images/ic_delete.png';

export default function AlertModal({ text, isShow = false, onClick }) {
  const className = `modal-content-alert ${isShow ? '' : 'hide'}`;
  return (
    <div className={className}>
      <div className="modal-close-icon-wrapper">
        <img src={icDelete} alt="창닫기" width="32px" onClick={onClick} />
      </div>
      <div className="modal-content-alert-text">{text}</div>
      <div className="button-wrapper done">
        <div className="primary-round-button" onClick={onClick}>
          확인
        </div>
      </div>
    </div>
  );
}
