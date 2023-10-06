const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/institutions/main.html");
});

app.get('/adminsignup', (req, res) => {
    res.sendFile(__dirname + "/admin_signup/index.html");
});

app.get('/adminsignin', (req, res) => {
  res.sendFile(__dirname + "/admin_login/index.html");
});


// Registration endpoint
app.post('/adminsignup', (req, res) => {
  const { institute, institute_id, email, password, name } = req.body;

  admin
    .auth()
    .createUser({
      email,
      password,
    })
    .then((userRecord) => {
      // User registered successfully
      const userId = userRecord.uid;
      const userData = {
        name,
        email,
        institute,
        institute_id
        // Add other user data fields here
      };

      // Save user data to Firestore
      return db.collection('users').doc(userId).set(userData);
    })
    .then(() => {
      res.redirect('/adminsignin')
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      res.status(500).send('Error registering user');
    });
});

app.post('/adminsignin', (req, res) => {
    const { email, password } = req.body;
  
    admin
      .auth()
      .getUserByEmail(email)
      .then((userRecord) => {
        const userId = userRecord.uid;
  
        // Sign in the user using Firebase Authentication
        return admin
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            res.status(200).json({ message: 'User signed in successfully', user });
          });
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        res.status(500).send('Error signing in');
      });
  });

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
