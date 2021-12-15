import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBN-bjo4FTqQr1Iwb-x_cM2aBboqL7eVYE",
    authDomain: "proyecto-prueba-f56cf.firebaseapp.com",
    projectId: "proyecto-prueba-f56cf",
    storageBucket: "proyecto-prueba-f56cf.appspot.com",
    messagingSenderId: "250094618852",
    appId: "1:250094618852:web:03f989ad0785ed6f8004f1",
    measurementId: "G-JRW1P61HBN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la DB
export const firestore = firebase.firestore();

// el módulo de autenticación
export const auth = firebase.auth();
// el proveedor de autenticación
export const provider = new firebase.auth.GoogleAuthProvider();
// la utilidad para hacer login con el pop-out
export const loginGoogle = () => auth.signInWithPopup(provider);
// la utilidad para hacer logout
export const logout = () => auth.signOut();

// exporta el paquete de firebase para poder usarlo
export default firebase;