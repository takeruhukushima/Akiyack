// src/main/SidebarComponent.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Linkコンポーネントのインポート
import './main_css/SidebarComponent.css'; // サイドバー専用のCSSをインポート

// アイコンファイルのパスを指定
import RegisterIcon from './icons/icon-register.svg';
import AboutIcon from './icons/icon-about.svg';
import HelpIcon from './icons/icon-help.svg';
import TitleIcon from './icons/icon-title.svg'; // タイトル用アイコンのインポート
import ProfileImage from './icons/profile-image.jpg'; // プロフィール画像をインポート

const SidebarComponent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div
      className={`sidebar ${
        isSidebarOpen ? 'sidebar-open' : 'sidebar-close'
      }`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className="sidebar-content">
        <div className="sidebar-title-container">
          <img src={TitleIcon} alt="Akiyack" className="sidebar-title-icon" />
          <div className="sidebar-title">Akiyack</div>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <img src={RegisterIcon} alt="Register AKIYA" className="sidebar-icon" />
            <Link to="/register" className="sidebar-link">Register AKIYA</Link>
          </li>
          <li className="sidebar-item">
            <img src={AboutIcon} alt="About us" className="sidebar-icon" />
            <Link to="#" className="sidebar-link">About us</Link>
          </li>
          <li className="sidebar-item">
            <img src={HelpIcon} alt="Help" className="sidebar-icon" />
            <Link to="#" className="sidebar-link">Help</Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-profile">
        <img src={ProfileImage} alt="User Profile" className="profile-image" />
        <div className="profile-name">User Name</div>
      </div>
    </div>
  );
};

export default SidebarComponent;
