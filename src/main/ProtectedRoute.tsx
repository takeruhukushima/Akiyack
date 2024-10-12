import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../supabaseClient'; // Supabaseクライアントをインポート

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // ローディング中に表示
  }

  if (!user) {
    // 認証されていない場合はサインインページにリダイレクト
    return <Navigate to="/signin" />;
  }

  // 認証されている場合は子コンポーネントをレンダリング
  return <>{children}</>;
};

export default ProtectedRoute;
