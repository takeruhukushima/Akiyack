// src/main/Home.tsx
import React from 'react';
import MapComponent from './MapComponent'; // 大文字で始まるファイル名
import ModalComponent from './ModalComponent'; // 大文字で始まるファイル名
import SidebarComponent from './SidebarComponent'; // 大文字で始まるファイル名
import './main_css/home.css'; // スタイルを適用

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <SidebarComponent />
      <div className="map-container">
        <MapComponent />
        <ModalComponent />
      </div>
    </div>
  );
};

export default Home;
