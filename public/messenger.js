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

// Function to format the timestamp as "how long ago" or the date if it's over 24 hours
function formatTimestamp(timestamp) {
  let date = timestamp.toDate();
  let now = new Date();
  let diff = (now - date) / 1000; // Difference in seconds
  if (diff < 60) {
    return "just now";
  } else if (diff < 60 * 60) {
    let minutes = Math.floor(diff / 60);
    return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
  } else if (diff < 60 * 60 * 24) {
    let hours = Math.floor(diff / (60 * 60));
    return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
  } else {
    let day = date.getDate();
    let month = date.toLocaleString("default", { month: "short" });
    let year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
}

function postTweet(ev) {
  ev.preventDefault();
  let tweetData = {
    tweet: tweet.value,
    email: firebase.auth().currentUser.email,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  console.log(tweetData);

  // Add a new document in collection "tweets"
  db.collection("tweets")
    .doc()
    .set(tweetData)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

db.collection("tweets")
  .orderBy("timestamp", "desc")
  .onSnapshot((querySnapshot) => {
    tweetTimeline.innerHTML = "";
    querySnapshot.forEach((doc) => {
      let tweetData = doc.data();

      // Create a new tweet element with the tweet and email
      let tweetElement = document.createElement("div");
      tweetElement.innerHTML = `<p>${tweetData.tweet}</p>
    <p class="timestamp">${formatTimestamp(tweetData.timestamp)}</p>
    <p class="email">${tweetData.email}</p>`;

      // Add the tweet element to the tweetTimeline element
      tweetTimeline.appendChild(tweetElement);
    });
  })
  .catch((error) => {
    console.error("Error getting tweets: ", error);
  });
