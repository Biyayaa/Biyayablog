// Hide the login page on load of the page
document.getElementById("sign-up-box").style.display = "none";

// Get the necessary elements from the HTML document
let loginBox = document.getElementById("login-box");
let signUpBox = document.getElementById("sign-up-box");
let loadingDiv = document.getElementById("loading-div");
let loadingDivL = document.getElementById("loading-divL");
let userNameInput = document.getElementById("user-name");
let emailInput = document.getElementById("user-email");
let passwordInput = document.getElementById("user-password");
let confirmPasswordInput = document.getElementById("confirm-password");
let signUpMessage = document.getElementById("signup-msg");
let loginEmailInput = document.getElementById("loginEm");
let loginPasswordInput = document.getElementById("loginPass");
let loginMessage = document.getElementById("login-msg");

// Hide the loading divs by default
loadingDiv.style.display = "none";
loadingDivL.style.display = "none";

// Show the login box and hide the sign up box
function loginPage() {
  signUpBox.style.display = "none";
  loginBox.style.display = "block";
}

// Show the sign up box and hide the login box
function signUpPage() {
  signUpBox.style.display = "block";
  loginBox.style.display = "none";
}

// Handle the sign up process
function signUp(ev) {
  ev.preventDefault();
  let username = document.getElementById("user-name");
  let email = document.getElementById("user-email");
  let pass = document.getElementById("user-password");

  if (
    passwordInput.value === confirmPasswordInput.value &&
    userNameInput.value != "" &&
    emailInput.value != ""
  ) {
    loadingDiv.style.display = "block";
    setTimeout(() => {
      loadingDiv.style.display = "none";
      signUpMessage.innerHTML = `
         <p id="success-msg">Sign up successful!!!</p>
       `;
    }, 2000);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, pass.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user
          .updateProfile({
            displayName: username.value,
          })
          .then(() => {
            console.log(user);
            alert("user sign-up sucessful")
            signUpBox.style.display = "none";
            loginBox.style.display = "block";
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  } else {
    alert("passwords don't match");
  }
}

// Handle the login process
function login(ev) {
  ev.preventDefault()

  let mail = loginEmailInput.value;
  let pass = loginPasswordInput.value;

  console.log({mail, pass});

  // Show the loading div
  loadingDivL.style.display = "block";






  firebase.auth().signInWithEmailAndPassword(mail, pass)
  .then((userCredential) => {
    // Signed in 
    let user = userCredential.user;
    alert("user sign in succesfull")
    // ...

    window.location.href = "messenger.html";
      window.localStorage.setItem("currentUser", JSON.stringify(user));
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    alert(errorCode, errorMessage)
  });
}






function signGoogle(ev) {
  ev.preventDefault()
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    alert("successfull")
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
      // ...

      console.log(user);
      
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


// firebase authenticatiom
  const firebaseConfig = {
    apiKey: "AIzaSyAyhA9CWzRZ9VB5dVEFTyozxNMj_amIvMc",
    authDomain: "project-ap-afcb6.firebaseapp.com",
    projectId: "project-ap-afcb6",
    storageBucket: "project-ap-afcb6.appspot.com",
    messagingSenderId: "342809190664",
    appId: "1:342809190664:web:e98cd981b5f40de89a0cbd"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  var provider = new firebase.auth.GoogleAuthProvider();

// // Get the current user information from localStorage
// function getUserInfo() {
//   let currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   console.log(currentUser);
// }
// getUserInfo();