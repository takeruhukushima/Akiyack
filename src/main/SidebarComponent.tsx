import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient'; // Supabaseクライアントをインポート
import './main_css/SidebarComponent.css';
import ProfileImage from './icons/profile-image.png';

// アイコンファイルのパスを指定
import RegisterIcon from './icons/icon-register.svg';
import AboutIcon from './icons/icon-about.svg';
import HelpIcon from './icons/icon-help.svg';
import TitleIcon from './icons/icon-title.svg'; // タイトル用アイコンのインポート

const SidebarComponent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Supabaseからユーザー情報を取得
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles') // ユーザープロフィールを格納しているテーブル名
          .select('*')
          .eq('id', user.id) // ユーザーIDに基づいて検索
          .single();

        if (error) {
          console.error('プロフィール情報の取得に失敗しました:', error);
        } else {
          setUserProfile(data);
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div
      className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className="sidebar-content">
        <div className="sidebar-title-container">
          <img src={TitleIcon} alt="Akiyack" className="sidebar-title-icon" />
          <Link to="home" className="sidebar-title">Akiyack</Link>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <img src={RegisterIcon} alt="Register AKIYA" className="sidebar-icon" />
            <Link to="/register" className="sidebar-link">Register AKIYA</Link>
          </li>
          <li className="sidebar-item">
            <img src={AboutIcon} alt="About us" className="sidebar-icon" />
            <a href="https://brown578260.studio.site" className="sidebar-link">About us</a>
          </li>
          <li className="sidebar-item">
            <img src={HelpIcon} alt="Help" className="sidebar-icon" />
            <a href="#" className="sidebar-link">Help</a>
          </li>
        </ul>
      </div>
      <div className="sidebar-profile">
  {/* ユーザーのプロフィール情報が取得できた場合に表示 */}
  {userProfile ? (
    <>
      <Link to={`/main/profile`}>
        <img src={userProfile.profile_image_url} alt="User Profile" className="profile-image" />
      </Link>
      <Link to={`/main/profile`}>
        <div className="/main/profile">{userProfile.username}</div>
      </Link> 
    </>
  ) : (
    <>
    <Link to={`/profile`}>
      <img src={ProfileImage} alt="User Profile" className="profile-image" />
    </Link>
    <Link to={`/profile`}>
      <div className="profile-name">User Name</div>
    </Link>
    </>
  )}
</div>

    </div>
  );
};

export default SidebarComponent;
