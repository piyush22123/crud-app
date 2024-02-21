require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("./db/conn.cjs");
const users = require("./models/userSchema.cjs");
const cors = require("cors");
const router = require("./routes/router.cjs");


const port = process.env.PORT || 3000; // choose port automatically

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
   console.log('listening on port ' + port); 
});
