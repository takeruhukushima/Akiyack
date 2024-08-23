import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient'; // Supabaseの設定をインポート
import './accounts_css/signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // ローディング状態を追加
  const [error, setError] = useState<string | null>(null); // エラーメッセージを保持する状態
  const [success, setSuccess] = useState(false); // 成功状態を追加
  const navigate = useNavigate(); // useNavigateフックを取得

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // ローディングを開始
    setError(null); // エラーメッセージをリセット

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // サインアップ成功後のメッセージ表示
      setSuccess(true);
      setLoading(false);
      // サインアップ成功後に/homeにリダイレクトする代わりに、成功メッセージを表示する
      // navigate('/home');
    } catch (error) {
      setLoading(false);
      // 認証失敗時のエラーハンドリング
      console.error('Sign Up Error:', error);
      setError('Failed to sign up. Please check your email and password.');
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
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && (
          <div className="success-message">
            <p>
              A confirmation email has been sent to {email}. Please check your inbox (and spam folder) to verify your email address. Once verified, you can log in to your account.
            </p>
            <p>
              <Link to="/signin">Log in</Link> once you have verified your email.
            </p>
          </div>
        )}
        <p>
          Already have an account? <Link to="/signin">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
