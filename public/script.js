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
function signUp(e) {

  e.preventDefault()
  // Check if the password and confirm password fields match and the Username and email fields are not empty
  if (
    passwordInput.value === confirmPasswordInput.value &&
    userNameInput.value != "" &&
    emailInput.value != ""
  ) {
    // Create a user object with the input values
    let user = {
      username: userNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
    };

    console.log(user.username);

    // Get the array of registered users from localStorage or create an empty array if it doesn't exist
    let registeredUsers = JSON.parse(localStorage.getItem("members")) || [];

    // Add the new user object to the array of registered users
    registeredUsers.push(user);

    // Save the updated array of registered users to localStorage
    localStorage.setItem("members", JSON.stringify(registeredUsers));

    // Display a success message and hide the sign up box after 2 seconds
    loadingDiv.style.display = "block";
    signUpMessage.innerHTML = `
      <p id="success-msg">Sign up successful!!!</p>
    `;


    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    alert("user sign up succesful")

     // Log in the user after sign up
     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
     .then((userCredential) => {
       // Signed in 
       var user = userCredential.user;
       alert("User sign in successful")
     })

       // Redirect to the dashboard page and store the current user in localStorage
       window.location.href = "messenger.html";
       window.localStorage.setItem("currentUser", JSON.stringify(user));


    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    alert("Try again")
  });


    setTimeout(() => {
      signUpBox.style.display = "none";
      loginBox.style.display = "block";
      loadingDiv.style.display = "none";
      signUpMessage.style.display = "none";
    }, 2000);

    // Clear the input fields
    userNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
  } else {
    // Display a failure message if the input values are invalid
    signUpMessage.innerHTML = `
      <p id="failed-msg">Sign up failed!!!</p>
    `;
    setTimeout(() => {
      signUpMessage.style.display = "none";
    }, 3000);
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

  // setTimeout(() => {
  //   // Hide the loading div after 3 seconds
  //   loadingDivL.style.display = "none";

  //   // Get the email and password entered on the login page
  //   let loginEmail = loginEmailInput.value;
  //   let loginPassword = loginPasswordInput.value;

  //   // Get the array of registered users from localStorage or create an empty array if it doesn't exist
  //   let registeredUsers = JSON.parse(localStorage.getItem("members")) || [];

  //   // Find the user object with the matching email and password
  //   let user = registeredUsers.find(
  //     (member) =>
  //       member.email === loginEmail && member.password === loginPassword
  //   );

  //   if (user) {
  //     // Redirect to the dashboard page and store the current user in localStorage
  //     window.location.href = "messenger.html";
  //     window.localStorage.setItem("currentUser", JSON.stringify(user));
  //   } else {
  //     // Display a failure message if the login credentials are invalid
  //     loginMessage.innerHTML = `
  //       <p id="failed-msg">Login failed! Please check your email and password.</p>
  //     `;
  //     setTimeout(() => {
  //       loginMessage.style.display = "none";
  //     }, 3000);
  //   }
  // }, 3000);




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
    alert("Try again")
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
      window.location.href = "messenger.html";
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

// Get the current user information from localStorage
function getUserInfo() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
}
getUserInfo();