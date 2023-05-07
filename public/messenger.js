// firebase authenticatiom
const firebaseConfig = {
  apiKey: "AIzaSyAyhA9CWzRZ9VB5dVEFTyozxNMj_amIvMc",
  authDomain: "project-ap-afcb6.firebaseapp.com",
  projectId: "project-ap-afcb6",
  storageBucket: "project-ap-afcb6.appspot.com",
  messagingSenderId: "342809190664",
  appId: "1:342809190664:web:e98cd981b5f40de89a0cbd",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Get the currently logged-in user
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    let me = user.email;
    console.log(me);
    let welcome = document.getElementById("welcome");
    welcome.innerHTML = `<h1>Welcome ${user.email}</h1>`;
  }
});

let tweet = document.getElementById("tweet");
let tweetTimeline = document.getElementById("tweetTimeline");

// Listen for changes to the tweets collection and update the tweetTimeline element
db.collection("tweets").onSnapshot((querySnapshot) => {
  // Clear the current contents of the tweetTimeline element
  tweetTimeline.innerHTML = "";

  // Loop through the documents in the query snapshot
  querySnapshot.forEach((doc) => {
    // Get the data for the current document
    let data = doc.data();

    // Create a new tweet element with the tweet and email
    let tweetElement = document.createElement("div");
    tweetElement.innerHTML = `<p>${data.tweet}</p><small>Posted by ${data.email}</small>`;

    // Add the tweet element to the tweetTimeline element
    tweetTimeline.appendChild(tweetElement);
  });
});


function postTweet(ev) {
    ev.preventDefault();
  let data = {
    tweet: tweet.value,
    email: firebase.auth().currentUser.email,
  };
  console.log(data);
  
  // Add a new document in collection "cities"
  db.collection("tweets")
    .doc()
    .set(data)
    .then(() => {
      console.log("Document successfully written!");
    //   window.location.href = "blog.html";
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}
