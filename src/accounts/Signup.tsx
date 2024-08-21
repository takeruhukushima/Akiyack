import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Firebaseの設定をインポート
import './accounts_css/signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigateフックを取得

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Firebase Authenticationでサインアップ
      await createUserWithEmailAndPassword(auth, email, password);
      // 認証成功後に/homeにリダイレクト
      navigate('/home');
    } catch (error) {
      // 認証失敗時のエラーハンドリング
      console.error('Sign Up Error:', error);
      alert('Failed to sign up. Please check your email and password.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/signin">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
