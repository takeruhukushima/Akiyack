import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './accounts/Signup';
import Signin from './accounts/Signin';
import Home from './main/home';
import RegisterAKIYA from './main/RegisterAKIYA';
import Profile from './main/Profile'; // プロフィールコンポーネントをインポート
import './App.css';
import Aboutus from './intro/aboutus';

function App() {
  return (
    <Router>
      <Routes>
        {/* "/" でHomeページを表示（認証不要） */}
        <Route path="/" element={<Home />} />

        {/* 認証不要なルート */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* 他のルート（認証不要） */}
        <Route path="/register" element={<RegisterAKIYA />} />

        {/* プロフィールページ（認証不要） */}
        <Route path="/profile" element={<Profile />} />

        <Route path="/aboutus" element={<Aboutus />} />


        {/* 不正なルートは "/" にリダイレクト */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
