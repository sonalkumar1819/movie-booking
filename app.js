const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

const url = 'mongodb://localhost:27017'; 
const dbName = 'bookingDB'; 
const client = new MongoClient(url);
let db;
let bookingCollection;
client.connect()
    .then(() => {
        console.log('Connected to MongoDB server');
        db = client.db(dbName);
        bookingCollection = db.collection('bookings');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB server:', err);
    });

const transporter = nodemailer.createTransport({
    service: 'gmail', // Adjust as per your email provider
    auth: {
        user: 'sonaljha9142@gmail.com', // Replace with your email
        pass: 'trve xkbp vlnh ewjg' // Replace with your password
    }
});

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'secondp.html'));
});

// Route to handle form submissions for booking
app.post('/book-ticket', async (req, res) => {
    try {
        // Get data from the request body
        const { name, mobile, email, movie, date, time } = req.body;

        // Prepare booking data
        const bookingData = {
            name,
            mobile,
            email,
            movie,
            date,
            time,
            createdAt: new Date() // Include a timestamp for when the booking was made
        };

        // Insert the booking data into the MongoDB collection
        await bookingCollection.insertOne(bookingData);

        // Send booking confirmation email
        const mailOptions = {
            from: 'sonaljha9142@gmail.com', // Replace with your email
            to: email, // User's email address
            subject: 'Booking Confirmation', // Subject of the email
            text: `Hi ${name},\n\nYour booking for the movie "${movie}" on ${date} at ${time} has been confirmed.Please pay Rs 300 online in just 15 minutes if you will not pay your booking will be canceled 1234567890 is my phone pay no.\n\nThank you for booking with us!\n\nBest regards,\nMovie Ticket Booking \n` // Email body
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send a response indicating success
        res.json({ success: true });
    } catch (error) {
        console.error('Error handling booking:', error);
        // Send a response indicating failure
        res.json({ success: false, error: error.message });
    }
});

// Set the port to listen on
const port = 1214; // Use any available port you prefer

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
