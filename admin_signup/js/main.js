import { auth, provider } from "../../firebase";

function signUp() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
  
    // Create a new user with email and password
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User registered successfully
        const user = userCredential.user;
        // You can store additional user data in your database here
        console.log("User registered:", user);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error registering user:", error);
      });
  }

document.getElementById('signup').addEventListener('click', signUp);