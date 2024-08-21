// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// もしアナリティクスも使用する場合は以下を追加
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyBZ8tUy4svqnFHxBYxviTCUG3RGT0tnZGg",
  authDomain: "akiyack.firebaseapp.com",
  projectId: "akiyack",
  storageBucket: "akiyack.appspot.com",
  messagingSenderId: "159344599671",
  appId: "1:159344599671:web:1e26b76dcae8d1a6331c72",
  measurementId: "G-EYW9FEDEVT"  // measurementIdが必要な場合
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app); // アナリティクスを使用する場合
export const db = getFirestore(app);

// 以下のコードは削除
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// const db = firebase.firestore();
// export { db };