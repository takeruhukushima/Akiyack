// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from './accounts/Welcome';
import Signup from './accounts/Signup';
import Signin from './accounts/Signin';
import Home from './main/home'; // home.tsxのインポート
import RegisterAKIYA from './main/RegisterAKIYA'; // RegisterAKIYA.tsxのインポート
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterAKIYA />} /> {/* 空き家登録ページのルート追加 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
