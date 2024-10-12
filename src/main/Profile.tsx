import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from './SidebarComponent';
import './main_css/profile.css';

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>('./icons/profile-image.png');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null); // アップロードするファイル
  const [displayName, setDisplayName] = useState<string>('未設定');
  const [email, setEmail] = useState<string>('example@example.com'); // メールアドレス
  const navigate = useNavigate();

  // 初回ロード時にユーザーデータを取得
  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error('Error fetching user data:', error);
        setErrorMessage('ユーザー情報の取得に失敗しました。再度お試しください。');
        setLoading(false);
        return;
      }

      // Supabaseのuser_metadataからDisplay nameと画像URLを取得
      setUserData(user);
      setDisplayName(user?.user_metadata?.['Display name'] || '未設定');
      setEmail(user?.email || 'example@example.com');
      setProfileImage(user?.user_metadata?.['profile_image_url'] || './icons/profile-image.png'); // 画像URL
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // プロフィール画像アップロード処理
  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file); // アップロードするファイルをセット
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // プレビュー用に画像を表示
      };
      reader.readAsDataURL(file);
    }
  };

  // プロフィール更新処理
  const handleUpdateProfile = async () => {
    setLoading(true);

    let profileImageUrl = profileImage;

    // 画像ファイルがある場合はSupabaseのStorageにアップロード
    if (profileImageFile) {
      const { data, error } = await supabase.storage
        .from('avatars') // ストレージバケット名
        .upload(`public/${userData.id}/profile-image.png`, profileImageFile, {
          upsert: true, // 同じファイルがあれば上書き
        });

      if (error) {
        console.error('Error uploading file:', error.message); // アップロードエラーのログ出力
        setErrorMessage(`画像のアップロードに失敗しました: ${error.message}`);
        setLoading(false);
        return;
      }

      // アップロードされた画像のURLを取得
      const { publicUrl } = supabase.storage
        .from('avatars')
        .getPublicUrl(`public/${userData.id}/profile-image.png`).data;

      profileImageUrl = publicUrl; // 画像URLをセット
    }

    // ユーザーデータを更新 (user_metadataに画像のURLを保存)
    const updates = {
      email,
      user_metadata: { 'Display name': displayName, 'profile_image_url': profileImageUrl },
    };

    // ユーザーデータの更新処理を実行し、結果をログに表示
    const { error: updateError } = await supabase.auth.updateUser({
      data: updates,
    });

    if (updateError) {
      console.error('Error updating user profile:', updateError.message); // 更新エラーのログ出力
      setErrorMessage(`プロフィールの更新に失敗しました: ${updateError.message}`);
      setLoading(false);
    } else {
      console.log('User profile updated successfully:', updates); // 成功ログ
      setSuccessMessage('プロフィールが更新されました！');
      setLoading(false);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
      alert('ログアウトに失敗しました。');
    } else {
      navigate('/signin');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  if (!userData) return <p>ユーザーが見つかりません</p>;

  return (
    <div className="container">
      <SidebarComponent />
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            <label htmlFor="profileImageInput">
              <img src={profileImage} alt="ユーザーアバター" style={{ cursor: 'pointer' }} />
            </label>
            <input
              type="file"
              id="profileImageInput"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleProfileImageUpload}
            />
          </div>
        </div>

        {/* ユーザーネームとメールアドレスの編集セクション */}
        <div className="profile-content">
          <div className="form-group">
            <label htmlFor="displayName">表示名を変更</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">メールアドレスを変更</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // メールアドレスの変更を反映
            />
          </div>

          <div className="profile-footer">
            <button className="update-button" onClick={handleUpdateProfile}>
              プロフィールを更新
            </button>
            <button className="logout-button" onClick={handleLogout}>
              ログアウト
            </button>
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
