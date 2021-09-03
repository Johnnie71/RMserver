const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// enabling us to call the environmental variables inside our application
require('dotenv').config();

// allowing cross origin requests
app.use(cors());
// allowing to pass json payloads from the frontend to the backend
app.use(express.json());
// built in middleware in express
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));