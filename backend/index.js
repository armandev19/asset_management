const express = require('express');
const mysql = require('mysql');
const moment = require('moment');
const app = express();


// const admin = require('firebase-admin');

// const serviceAccount = require('./asset-54ae3-firebase-adminsdk-df262-3ec329e5a7.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

app.use(express.json());
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
//   database: 'YgtDGdmoEn',
// });

// localhost', 'root', 'YgtDGdmoEn'

// db.connect(() => {
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

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

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
//   const searchTerm = req.query.search;

//   let query = 'SELECT * FROM locations';
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

// app.post('/asset-maintenance', (req, res) => {
//   try{
    
//     const { device_token } = req.body;

//     const query = `SELECT item.asset_name, am.schedule as schedule, count(am.id) as m_count FROM asset_maintenance as am LEFT JOIN assets as item ON item.id = am.asset_id WHERE YEAR(am.schedule) ='2023'`;
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error querying MySQL:', err);
//         return res.status(500).send('Error fetching data');
//       }
//       res.json(results);
//       let description;
//       let body = 'You have ' + results[0].m_count + ' assets scheduled for maintenance today.';
//       sendPushNotification(device_token, 'Maintenance', body);
//     });
//   }catch(error){
//     console.log("error", error)
//   }
// });

// const sendPushNotification = (token, title, body) => {
//   admin.messaging().send({
//     token: token,
//     notification: {
//       title: title,
//       body: body,
//     },
//   })
//   .then(() => {
//     console.log('Push notification sent successfully');
//   })
//   .catch((error) => {
//     console.error('Error sending push notification:', error);
//   });
// };

// // Example endpoint to send push notification
// app.post('/send-notification', (req, res) => {
//   const { device_token, title, body } = req.body;
//   sendPushNotification(device_token, 'asdasdasdasd', 'ari na');
//   res.send('Push notification sent');
// });