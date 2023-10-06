const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const hashPassword = require('password-hash');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();
app.use('/css', (req, res, next) => {
  res.type('text/css');
  next();
}, express.static(path.join(__dirname, './css')));
app.use('/public', express.static(path.join(__dirname, './public')));
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
    var { institute, institute_id, email, password, name } = req.body;
  
    admin
      .auth()
      .createUser({
        email,
        password,
      })
      .then((userRecord) => {
        // User registered successfully
        password = hashPassword.generate(password);
        const userId = userRecord.uid; // Get the Firebase UID
        const userData = {
          name,
          password,
          email,
          institute,
          institute_id,
          // Add other user data fields here
        };
  
        // Save user data to Firestore using Firebase UID as the document ID
        return db.collection('users').doc(userId).set(userData);
      })
      .then(() => {
        res.redirect('/adminsignin');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
      });
  });
  

  app.post('/adminsignin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Get the Firebase UID associated with the email
        const userRecord = await admin.auth().getUserByEmail(email);
        const userId = userRecord.uid;

        // Retrieve user data by Firebase UID
        const userDoc = await admin.firestore().collection('users').doc(userId).get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            const storedHashedPassword = userData.password;
            const isPasswordValid = hashPassword.verify(password, storedHashedPassword);


            if (isPasswordValid) {
                res.status(200).json({ message: 'Successful' });
                // You can redirect the user here if needed.
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
