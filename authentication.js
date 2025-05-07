// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const firstNameField = document.querySelector("#firstName");
const lastNameField = document.querySelector("#lastName");
const emailField = document.querySelector("#exampleInputEmail1");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "tpf-lab04-e17ce.firebaseapp.com",
    projectId: "tpf-lab04-e17ce",
    storageBucket: "tpf-lab04-e17ce.firebasestorage.app",
    messagingSenderId: "1084877120682",
    appId: "1:1084877120682:web:c1005370e39fce25771cd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}
const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}
onAuthStateChanged(
    auth, 
    (user) => {
        if (user) {
            alert("You are authenticated with Google");
            console.log(user);
            firstNameField.value = user.displayName.split(" ")[0];
            lastNameField.value = user.displayName.split(" ")[1];
            emailField.value = user.email;
        }})
signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);   
