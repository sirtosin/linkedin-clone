import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBebzR8NdfN5DHyNqIjCMkr_cVlTFMvMrg",
  authDomain: "linkedin-clone2-a49aa.firebaseapp.com",
  projectId: "linkedin-clone2-a49aa",
  storageBucket: "linkedin-clone2-a49aa.appspot.com",
  messagingSenderId: "724088560323",
  appId: "1:724088560323:web:188e388b9dc7e819cae076",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { auth, storage };
export default db;
