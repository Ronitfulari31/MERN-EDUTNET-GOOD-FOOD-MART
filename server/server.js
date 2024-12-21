const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cookiePasrser = require('cookie-parser');

const app = express();
// Middleware to parse incoming JSON data
app.use(express.json()); // This is necessary for POST requests

app.use(cookiePasrser())

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "this is example" });
});

app.listen(PORT, () => {
  console.log("server is running on");
});

//routers

app.use("/user", require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productrouter'))


//connect mongoDB

const URI = process.env.MONGODB_URL;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });
