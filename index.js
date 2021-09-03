const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//enabling us to call the environmental variables inside our application
require('dotenv').config();