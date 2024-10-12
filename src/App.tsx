import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './accounts/Signup';
import Signin from './accounts/Signin';
import Home from './main/home';
import RegisterAKIYA from './main/RegisterAKIYA';
import Profile from './main/Profile'; // プロフィールコンポーネントをインポート
import ProtectedRoute from './main/ProtectedRoute'; // ProtectedRouteをインポート
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* "/" でHomeページを表示し、認証が必要なルートにする */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 認証不要なルート */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* 他の保護されたルート */}
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterAKIYA />
            </ProtectedRoute>
          }
        />

        {/* プロフィールページへの保護されたルート */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 不正なルートは "/" にリダイレクト */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
