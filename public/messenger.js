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
  firebase.initializeApp(firebaseConfig);


// Get the currently logged-in user
// Get the currently logged-in user
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let me = user.email;
      console.log(me);
  
      let welcome = document.getElementById("welcome");
      welcome.innerHTML = `<h1>Welcome ${user.email}</h1>`;
    }
  });
