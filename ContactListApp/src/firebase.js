import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCv6f-pbs-TRzFl7FXc-hcV3PWp9PDl8Tk",
    authDomain: "contacts-app-b2c0d.firebaseapp.com",
    projectId: "contacts-app-b2c0d",
    storageBucket: "contacts-app-b2c0d.appspot.com",
    messagingSenderId: "217990644604",
    appId: "1:217990644604:web:cb53d8fdaf1d27c71b5af9",
    databaseURL: "https://contacts-app-b2c0d-default-rtdb.asia-southeast1.firebasedatabase.app",
  };


  export const app = initializeApp(firebaseConfig);