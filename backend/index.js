const express = require('express');
const mysql = require('mysql');
const moment = require('moment');
const app = express();
const nodemailer = require('nodemailer');
const axios = require('axios');
const admin = require('firebase-admin');
const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const { GoogleAuth } = require('google-auth-library')

const serviceAccount = require('./asset-54ae3-firebase-adminsdk-df262-fafebee9a6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YgtDGdmoEn',
  database: 'asset_management',
});

// localhost', 'root', 'YgtDGdmoEn'

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

let accessToken;
async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFilename: './asset-54ae3-9db6a8994ad7.json',
    scopes: ['https://www.googleapis.com/auth/cloud-platform'], // Scope for FCM HTTP v1 API
  });

  const client = await auth.getClient();
  accessToken = await client.getAccessToken();
  return accessToken;
}

getAccessToken().then((token) => {
  console.log("Access Token:", token);
}).catch((error) => {
  console.error("Error getting access token:", error);
});

const emailSender = (from, to, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arman.jacolbe19@gmail.com',
      pass: 'nrcwafsbaptmovzc'
    }
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendNotification = async (token, title, body) => {

  const projectId = 'asset-54ae3'; // Replace with your project ID
  const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;
  const headers = {
    Authorization: `Bearer ${accessToken.token}`,
    "Content-Type": "application/json",
  };

  const payload = {
    message: {
      notification: {
        title: title,
        body: body,
      },
      token: token, // Replace with the actual FCM token of the target device
    },
  };

  try {
    const response = await axios.post(url, payload, { headers });
    console.log("Notification sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending notification:", error.response?.data || error.message);
  }
};

// app.post('/testEmail', (req, res) => {
//   // emailSender("test123@gmail.com", "arman.jacolbe19@gmail.com", "Test subject", "Test email content");
//   sendPushNotification(token, 'test 123', 'rawr');
// });
// sql313.epizy.com', 'epiz_34224108', 'aHJM0oI8Ttl7
// const db = mysql.createConnection({
//   host: 'app-ams.online',
//   user: 'u278714988_ams',
//   password: '/e63yY72N9',
//   database: 'u278714988_ams',
// });


const dateToday = moment(new Date()).format("YYYY-MM-DD")

// app.get('/api/assets', (req, res) => {
//   const searchTerm = req.query.search;

//   let query = 'SELECT * FROM assets';
//   if (searchTerm) {
//     // Modify the query to include a WHERE clause for filtering
//     query = `SELECT * FROM assets WHERE asset_code LIKE '%${searchTerm}%' OR asset_name LIKE '%${searchTerm}%'`;
//   }

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error querying MySQL:', err);
//       return res.status(500).send('Error fetching data');
//     }
//     res.json(results);
//   });
// });

function getYearDifference(date1, date2) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();

  const month1 = date1.getMonth();
  const month2 = date2.getMonth();

  const day1 = date1.getDate();
  const day2 = date2.getDate();

  let yearDifference = year2 - year1;

  // Adjust for months and days
  if (month2 < month1 || (month2 === month1 && day2 < day1)) {
    yearDifference--;
  }

  return yearDifference;
}

function maintenanceReminder() {
  try {
    db.query("SELECT a.asset_name as name, am.maintenance_description as description FROM asset_maintenance as am LEFT JOIN assets as a ON a.id=am.asset_id", (err, results) => {
      if (results.length === 0) {
        console.log("No assets scheduled for maintenance today.");
        return;
      }
      let content = results.map((row, index) => `${index + 1}.${row.name} - ${row.description}`).join('\n');
      const body = `You have assets scheduled for maintenance today: \n${content}`;

      (async () => {
        try {
          const users = await fetchAllUserDetails();
          users.forEach(user => {
            sendNotification(user.notif_token, 'Maintenance', body);
            emailSender("", user.email, "Maintenance", body);
            db.query("INSERT INTO notifications(title, body, user_id)VALUES(?, ?, ?)",['Maintenance', body, user.id], (err, results) => { })
          });
        } catch (err) {
          console.error("Error fetching users:", err);
        }
      })();

    })
  } catch (error) {
    console.log("error", error)
  }
  console.log('This task runs once every day at midnight');

}

 /* THIS IS THE CRONJOB */
cron.schedule('08 16 * * *', maintenanceReminder, {
  scheduled: true,
  timezone: "Asia/Kuala_Lumpur" // Optional: specify your timezone
});

function fetchAllUserDetails() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        id, email, notif_token, access_level
      FROM 
        users
    `;

    db.query(query, (err, results) => {
      if (err) {
        reject(err); // Reject the promise with an error
        return;
      }
      resolve(results); // Resolve the promise with results
    });
  });
}

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});