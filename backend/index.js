const express = require('express');
const mysql = require('mysql');
const moment = require('moment');
const app = express();
const nodemailer = require('nodemailer');
const axios = require('axios');
const admin = require('firebase-admin');
const cron = require('node-cron');
const { GoogleAuth } = require('google-auth-library')

const serviceAccount = require('./asset-54ae3-firebase-adminsdk-df262-fafebee9a6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const getAccessToken = async () => {
  const auth = new GoogleAuth({
    keyFile: '../asset-54ae3-7f6cb6aafe24.json',
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token;
};

// app.use(express.json());

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
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


const sendPushNotification = (token, title, body) => {
  admin.messaging().send({
    token: token,
    notification: {
      title: title,
      body: body,
    },
  })
  .then(() => {
    console.log('Push notification sent successfully');
  })
  .catch((error) => {
    console.error('Error sending push notification:', error);
  });
};

const token = "eusFNRCYQDuW-YFbNjIjrY:APA91bHGcGVTaqHyzjTb02QKuiE88630P_8Yp9Fjf5FYrLD59-YhINtHRCRX5P2LnKRoobFkpPcR_8BQ2VYnlq55fUUw9ML2_7oph9gyxi9an6M6rYFxKipDLCDti2ha9jC8c4szjpDL"

const sendNotification = async (deviceToken, title, body) => {
  const projectId = 'asset-54ae3'; // Replace with your project ID
  const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

  const message = {
    message: {
      token: deviceToken, // The device's FCM token
      notification: {
        title: title,
        body: body,
      },
      android: {
        priority: 'high',
      },
      apns: {
        payload: {
          aps: {
            alert: {
              title: title,
              body: body,
            },
            sound: 'default',
          },
        },
      },
    },
  };

  const accessToken = await getAccessToken();

  try {
    const response = await axios.post(url, message, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Notification sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending notification:', error.response.data);
  }
};

// Example usage
// sendNotification(
//   'eusFNRCYQDuW-YFbNjIjrY:APA91bHGcGVTaqHyzjTb02QKuiE88630P_8Yp9Fjf5FYrLD59-YhINtHRCRX5P2LnKRoobFkpPcR_8BQ2VYnlq55fUUw9ML2_7oph9gyxi9an6M6rYFxKipDLCDti2ha9jC8c4szjpDL', // Replace with the device's FCM token
//   'Test Notification',
//   'This is a message sent using the HTTPv1 API!'
// );

app.post('/testEmail', (req, res) => {
  // emailSender("test123@gmail.com", "arman.jacolbe19@gmail.com", "Test subject", "Test email content");
  sendPushNotification(token, 'test 123', 'rawr');
});
// sql313.epizy.com', 'epiz_34224108', 'aHJM0oI8Ttl7
// const db = mysql.createConnection({
//   host: 'app-ams.online',
//   user: 'u278714988_ams',
//   password: '/e63yY72N9',
//   database: 'u278714988_ams',
// });

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'asset_management',
// });

// // localhost', 'root', 'YgtDGdmoEn'

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL');
// });

// db.connect(function (err) {
//   if(err){
//       console.log("error occurred while connecting", err);
//   }else{
//       console.log("connection created with Mysql successfully");
//   }
// });


// const serverkey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDaT+j/s+f9pKP7\nObSieH1Z77ENtVlanTl5J/YoeSXR+2nO7IeXhhwhyqZrE9PVpXtCmKhqfQQgevD6\nCM/x6lLBQEl2aLM5PBQgxtpogZvYkHzFLI3R6XoaDrkt4KS3AtWEB9cuGP4aT9JE\nQTYpsao7Q8MsDWZOO3VwHZeZFBn4ilMFtAgMqwxcp2zi1p8qLOoz7tmz6bzFmjjh\nnAUVAjmfQTTyguQq4+r3PJnT4SeDbNKe1JztPrRHYx+Ch1BRBXbnMoT3iaGQOuKV\nP2YXM03wHFo2xZk7CJjgUmr8hpYWZMJPMz2y2vYdeIDEoOqQFfYMhqzo6cgN6GNk\nz+owJh/RAgMBAAECggEAHripEra3+lcdZmCX/VcUWMAku8ed4+UFLfoEJ2zo+BQ3\nrxFVAWszcUPpyF65bDLF1jjSVm3yUznJyH3N+X6el6hazilssyyzrmsdWCCJFGA8\n1qhu6q++6YTR5VVcCI8DCfnqe4ez1nMOJWHB4/sm+AEQqZXXJEI0xAq+ByIvh2x5\nHj5byL9nqIPMrs7pGkLP5wd6qw9uZ3uw1Hg1Z5Yx7W6K0MGrCnPt6gebfBuBkT37\nMhbdG5OIA5lhUb4NAQCtVqg5B1U64AXu+lbNsHRaXnHNPYqW900IPFhd/ExcgJAB\n4Ul6MnzzkBTQ3Chx+v41Uabfouva5foqNo0Wv5+DEwKBgQD6VwZQjZE3D0tEdVdW\nS++w8P3MMmjiIJGQzantqegEpwNmSk8KsthnXdjDBjAZrnV6QO4khBxK34+Alp8n\nu0XimhcO6EU6sj5iLMeC7yyw0ZocK+F4aU7y41w2YGhdWWUa3peUl2qd00Jhmjea\nd6tNUgekh5rn1gCiUGIaao0c8wKBgQDfP4H0iKiKbTpCec4tCSfb9OqmJameNBxe\nvH4NQ7l/OCfQ3pFC7s8r4mhHrR4cdB3R3MuUwONbQleV5Y3I7cAuNg1pDan2mx9E\nyi7pBSHyVB512tGSVuUsF2YIu8C1tTLFutLUl2OTH1sqrBNJT2oNuwg7x7VWHLNT\n2/JOm2lxKwKBgHEvbZR4HWL2kEJYh29mD+5BV46+b/tlXEtLIXxqKJQJ6xiRmmEs\n8XjyznGG17KU1Vq8BrAN5zjXEWvDLhxpqLRGlQxRahOayWfb9Sy29M7RRctc76lg\ne6iHsYaIWkdyhqr6XzB4sWTAQrAcaO13E8V2xCvYf+o4MLsyetiUuk6PAoGAfCzR\n9xdQT/bjcfhYcvplvlXjctj+GK45nYRQxMYH1riAhRBXUhiNCYbcpAmp9v+rWoDq\nh+omTCuBljHiBIIh5FJScT2VbULpSJUBNMGTGTwq2TkGWtSUkkrNiUwNq8SG4i7B\neFhgnYPSbNDbxWozvkFrGf1CYwyBvsJXa9vL8ZMCgYEAySdj7n+r8OrfPinU6O0Y\np1oZ+mwKqZ87uTJtqBviFmJKal6T5Z3qPSI7Wik4R8R+K1Yn009Xl+B673T/m9cL\nyO9vEe2WngRIGBKuYE8g2Wklqo4mhgQRgqGhXzEIrBszr7trpLghQXb0sBORnuRe\niJC7XJwB7wna/UzugPREJHg=';

// const dateToday = moment(new Date()).format("YYYY-MM-DD")

// app.get('/api/users', (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) {
//       console.error('Error querying MySQL:', err);
//       return res.status(500).send('Error fetching data');
//     }
//     res.json(results);
//   });
// });

// app.get('/api/user-details', (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) {
//       console.error('Error querying MySQL:', err);
//       return res.status(500).send('Error fetching data');
//     }
//     res.json(results);
//   });
// });

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

// app.get('/api/locations', (req, res) => {

//   let query = 'SELECT * FROM assets';
//   if (searchTerm) {
//     // Modify the query to include a WHERE clause for filtering
//     query = `SELECT * FROM locations WHERE name LIKE '%${searchTerm}%' OR address LIKE '%${searchTerm}%'`;
//   }

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error querying MySQL:', err);
//       return res.status(500).send('Error fetching data');
//     }
//     res.json(results);
//   });
// });





// function getYearDifference(date1, date2) {
//   const year1 = date1.getFullYear();
//   const year2 = date2.getFullYear();

//   const month1 = date1.getMonth();
//   const month2 = date2.getMonth();

//   const day1 = date1.getDate();
//   const day2 = date2.getDate();

//   let yearDifference = year2 - year1;

//   // Adjust for months and days
//   if (month2 < month1 || (month2 === month1 && day2 < day1)) {
//       yearDifference--;
//   }
  
//   return yearDifference;
// }

// function dailyTask() {
//   try{
//     // const query = `SELECT * FROM assets`;
//     // db.query(query, (err, results) => {
      
//     //   if (err) {
//     //     console.error('Error executing query:', err);
//     //     return;
//     //   }
//     //   const currentYear = new Date();
//     //   results.forEach(row => {
//     //     let diff = getYearDifference(row.purchase_date,currentYear)
//     //     // if (diff >= 1) {
//         db.query("SELECT * FROM users WHERE notif_token != '' ", (err, results) => {
//           const body = `You have assets scheduled for maintenance today rawr.`;
//           results.forEach(row => {
//             sendPushNotification(row.notif_token, 'Maintenance', body);
//           })
//         })
           
//         // }
//     // });

//     // });
//   }catch(error){
//     console.log("error", error)
//   }
//     console.log('This task runs once every day at midnight');
//     // Add your task logic here
// }
// // dailyTask();

// // Schedule the task to run every day at midnight
// cron.schedule('21 04 * * *', dailyTask, {
//     scheduled: true,
//     timezone: "Asia/Kuala_Lumpur" // Optional: specify your timezone
// });

// app.post('/asset-maintenance', (req, res) => {
//   try{
//     const device_token = "eVjv2-tRQSeyNueiq1yhBM:APA91bFxTpgmffswnzuMpkrSP_nf2u-n2AM57hRvpe3Y2eL_cys_R7Ax1KCpzc3g01Xa2WQAuhlSvN7o_se5u8ysXCLOVjg_q3ziMK4qmyTJfvkt6X-HKcqdNAjtRsi3Q_Wxg73WWTIi"

//     // const query = `SELECT item.asset_name, am.schedule as schedule, count(am.id) as m_count FROM asset_maintenance as am LEFT JOIN assets as item ON item.id = am.asset_id WHERE YEAR(am.schedule) ='2023'`;
//     // db.query(query, (err, results) => {
//     //   if (err) {
//     //     console.error('Error querying MySQL:', err);
//     //     return res.status(500).send('Error fetching data');
//     //   }
//     //   res.json(results);
//     //   let description;
//       let body = 'You have assets scheduled for maintenance today.';
//       sendPushNotification(device_token, 'Maintenance', body);
//     // });
//   }catch(error){
//     console.log("error", error)
//   }
// });

// // Example endpoint to send push notification
// app.post('/send-notification', (req, res) => {
//   const { device_token, title, body } = req.body;
//   sendPushNotification(device_token, 'asdasdasdasd', 'ari na');
//   res.send('Push notification sent');
// });


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});