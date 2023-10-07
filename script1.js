const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const hashPassword = require('password-hash');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

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

app.get('/admindashboard', (req, res) => {
  res.sendFile(__dirname + "/admin/index.html");
});

app.get('/admindashboard1', (req, res) => {
  res.sendFile(__dirname + "/admin/index1.html");
});

app.get('/admindashboard2', (req, res) => {
  res.sendFile(__dirname + "/admin/index2.html");
});

app.get('/admindashboard3', (req, res) => {
  res.sendFile(__dirname + "/admin/index3.html");
});

app.get('/admindashboard4', (req, res) => {
  res.sendFile(__dirname + "/admin/index4.html");
});

app.get('/admindashboard5', (req, res) => {
  res.sendFile(__dirname + "/admin/index5.html");
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

app.get('/inchargelogin', (req, res) => {
  res.sendFile(__dirname + "/incharge/index.html");
});

app.get('/facultylogin', (req, res) => {
  res.sendFile(__dirname + "/faculty/index.html");
});

app.get('/inchargedashboard', (req, res) => {
  res.sendFile(__dirname + "/incharge/dashboard.html");
});

app.get('/facultydashboard', (req, res) => {
  res.sendFile(__dirname + "/faculty/dashboard.html");
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
                res.redirect('/admindashboard');
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

// Add this route to your Express app
app.post('/submit-invigilation-form', async (req, res) => {
  try {
    // Extract form data from the request
    const { room_number, pad_number, exam_date, start_time, end_time } = req.body;

    // Create an object to represent the invigilation form data
    const invigilationData = {
      room_number,
      pad_number,
      exam_date,
      start_time,
      end_time,
      // Add other form fields as needed
    };

    // Store the invigilation form data in Firestore
    const result = await db.collection('invigilationForms').add(invigilationData);

    // Respond with a success message or other appropriate response
    res.status(201).json({ message: 'Invigilation form submitted successfully', id: result.id });
  } catch (error) {
    console.error('Error submitting invigilation form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Assuming you already have your Express and Firestore setup

// Add Faculty
app.post('/facultysubmit', async (req, res) => {
  try {
    const {
      departmentName,
      courseName,
      courseId,
      facultyName,
      facultyId,
      facultyMail,
      facultyDesignation
    } = req.body;
    
    // Create a new faculty object
    const facultyData = {
      departmentName,
      courseName,
      courseId,
      facultyName,
      facultyId,
      facultyMail,
      facultyDesignation,
      assignedCount: 0
    };
    
    // Add the faculty data to Firestore
    const result = await db.collection('faculties').add(facultyData);
    
    res.status(201).json({ message: 'Faculty information submitted successfully', id: result.id });
  } catch (error) {
    console.error('Error adding faculty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// // Function to reset invigilation counts for all faculty members
// async function resetInvigilationCounts() {
//   try {
//     // Get all faculty members from Firestore
//     const facultyCollection = db.collection('faculties');
//     const facultySnapshot = await facultyCollection.get();

//     // Iterate through faculty members and reset their counts
//     const batch = db.batch();
//     facultySnapshot.forEach((facultyDoc) => {
//       const facultyRef = facultyCollection.doc(facultyDoc.id);
//       batch.update(facultyRef, { assignedCount: 0 });
//     });

//     // Commit the batch update to Firestore
//     await batch.commit();

//     console.log('Invigilation counts reset for all faculty members.');
//   } catch (error) {
//     console.error('Error resetting invigilation counts:', error);
//   }
// }

// // Call this function at the beginning of each academic year or as needed
// resetInvigilationCounts();


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


