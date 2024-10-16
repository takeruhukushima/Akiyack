import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient'; // Supabaseの設定をインポート
import './main_css/RegisterAKIYA.css';

// ステップの定義
const steps = [
  {
    id: 'intro',
    title: 'AKIYACKで空き家をご登録',
    content: [
      { step: 1, text: '空き家の情報を入力', description: '空き家のご住所や状況などの基本情報を入力しましょう', icon: '🏠' },
      { step: 2, text: '空き家の状況を記入', description: 'タイトル、説明文を追加しましょう。', icon: '📸' },
      { step: 3, text: 'ページ作成を完了', description: 'いくつかの詳細を確認してから、AKIYAページを公開しましょう。', icon: '🚀' }
    ]
  },
  { id: 'location', question: '空き家の所在地をご入力ください', placeholder: '住所を入力' },
  { id: 'description', question: '空き家の説明を入力してください', placeholder: '説明を入力' },
  { id: 'finish', text: '完了', description: 'いたずら防止のため登録された情報を確認した後、mapページにて公開します。' },
];

const RegisterHouse: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({
    location: '',
    description: '',
    title: ''
  });
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        alert('ログインが必要です');
        return;
      }

      const { error } = await supabase
        .from('akiya')
        .insert([{
          location: formData.location,
          description: formData.description,
          title: formData.title,
          created_at: new Date(),
          updated_at: new Date(),
          user_id: user.id, // 必要に応じてユーザーIDを追加
        }]);

      if (error) {
        throw error;
      }

      navigate('/home'); // 完了後にhomeページにリダイレクト
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('エラーが発生しました。もう一度お試しください。');
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="register-house-container">
      <div className="register-house-inner">
        <div className="register-house-header">
          <h1>AKIYACK</h1>
          <div className="register-house-header-buttons">
            <button className="register-house-header-button" onClick={() => alert('質問がありますか？')}>ご質問がありますか？</button>
            <button className="register-house-header-button" onClick={() => alert('保存して終了')}>保存して終了</button>
          </div>
        </div>

        {/* ステップに応じた表示 */}
        {currentStep === 0 ? (
          <div className="intro-step">
            <h1 className="register-house-title">{steps[currentStep].title}</h1>
            <ul className="intro-content">
              {steps[currentStep].content?.map(item => (
                <li key={item.step} className="intro-item">
                  <span className="intro-icon">{item.icon}</span>
                  <div className="intro-text">
                    <h2>{item.text}</h2>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : currentStep === steps.length - 1 ? (
          <div className="finish-step">
            <h1 className="register-house-title">{steps[currentStep].text}</h1>
            <p>{steps[currentStep].description}</p>
          </div>
        ) : (
          <div className="input-step">
            <h1 className="register-house-title">{steps[currentStep].question}</h1>
            {currentStep === 1 ? (
              <>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="register-house-input"
                  placeholder="住所を入力"
                  required
                />
              </>
            ) : currentStep === 2 ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className="register-house-input"
                  placeholder="タイトルを入力"
                  required
                />
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="register-house-textarea"
                  placeholder="説明を入力"
                  required
                />
              </>
            ) : null}
          </div>
        )}

        <div className="register-house-progress-bar">
          <div 
            className="register-house-progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button 
              onClick={handlePrevious} 
              className={`register-house-button register-house-button-previous ${currentStep === 0 ? 'register-house-button-previous-disabled' : ''}`}
              disabled={currentStep === 0}
            >
              戻る
            </button>
          )}
          <button 
            onClick={handleNext} 
            className={`register-house-button register-house-button-next ${currentStep === steps.length - 1 ? 'register-house-button-next-disabled' : ''}`}
            disabled={currentStep === steps.length - 1 && !formData.location}
          >
            {currentStep === steps.length - 1 ? '完了' : '次へ'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default RegisterHouse;
