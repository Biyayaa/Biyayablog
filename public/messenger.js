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
let storage = firebase.storage().ref()
const db = firebase.firestore();


// Get the currently logged-in user
let thisUser;
let avatar;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    avatar = user.photoURL;
    thisUser = user;
    let welcome = document.getElementById("welcome");
    welcome.innerHTML = `<h1>Welcome ${user.displayName}</h1>
    
    <img src="${user.photoURL} class="pp" width="50">`;
  }
});

function pickFile(e) {
  let reader = new FileReader();
  let file = e.target.files[0];
  console.log(file);
  reader.addEventListener("load", (e) => {
    console.log(e);
  });
  if (file) {
    reader.readAsDataURL(file);
  }
}

function update(ev) {
    let avatar = document.getElementById("avatar");
    ev.preventDefault();
    console.log(thisUser);
    let file = avatar.files[0];
    let imgName = avatar.files[0].name;
  
    // Generate a unique ID for the user
    const userId = firebase.auth().currentUser.uid;
  
    // Modify the file path to include the user's ID
    const filePath = `user_avatars/${userId}/${imgName}`;
  
    var uploadTask = storage.child(filePath).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          thisUser
            .updateProfile({
              photoURL: downloadURL,
            })
            .then(() => {
              console.log("Profile successfully updated");
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
      }
    );
}
  

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
      photoURL: firebase.auth().currentUser.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log(tweetData);
  
    tweet.value = "";
  
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

      // Create a new tweet element with the tweet, photoURL and email
      let tweetElement = document.createElement("div");
      tweetElement.innerHTML = `<div class="user-tweet">
      <div user-pp>
      <img src="${tweetData.photoURL}" class="pp">
      </div>

      <div class="user-tweet-details">
      <div class="user-name-time">
      <p class="email">${tweetData.email}</p>
      <p class="timestamp">.${formatTimestamp(tweetData.timestamp)}</p>
      </div>
      
      <p class="tweet">${tweetData.tweet}</p>
      </div>
       <hr></div>`;

      // Add the tweet element to the tweetTimeline element
      tweetTimeline.appendChild(tweetElement);
    });
  }, (error) => {
    console.error("Error getting tweets: ", error);
  }); 
  

