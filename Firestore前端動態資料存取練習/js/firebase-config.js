// TODO: 設置Firebase相關資訊
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJppRUsp__V-tXsQxV8Xumps0cOczU_qk",
  authDomain: "csie-318-0723.firebaseapp.com",
  databaseURL: "https://csie-318-0723.firebaseio.com",
  projectId: "csie-318-0723",
  storageBucket: "",
  messagingSenderId: "114334145010",
  appId: "1:114334145010:web:ca5b770b6783239b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//  定義資料庫為db
const db = firebase.firestore();
const DB = firebase.database();
