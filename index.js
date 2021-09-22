const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

// enabling us to call the environmental variables inside our application
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
// Twilio account allowing us to make the request in order to get SMS notifications
const twilioClient = require('twilio')(accountSid, authToken);

// allowing cross origin requests
app.use(cors());
// allowing to pass json payloads from the frontend to the backend
app.use(express.json());
// built in middleware in express
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    // getting the data from stream to send over to twilio for sms notifications
    const { message, user: sender, type, members } = req.body;

    if (type === 'message.new') {
        members.forEach(({ user }) => {
            // Only sending messages to the user that is not online
            if(!user.online){
                twilioClient.messages.create({
                    body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                    messagingServiceSid: messagingServiceSid,
                    to: user.phoneNumber
                })
            }
        })
    }
})

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));