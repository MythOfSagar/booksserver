require("dotenv").config();

const connection = require("./config/db");
const express = require("express");
const { UserModel } = require("./models/user.model");
const{ flghtRouter}= require('./routes/flights.route')
const {bookingRouter}=require('./routes/booking.route')

const app = express();

app.use(express.json());

app.use('/flights',flghtRouter)
app.use('/booking',bookingRouter)

app.get("/", (req, res) => {



  res.send("Flights HomePage");
  res.sendStatus(200);
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new UserModel({ name, email, password });
    await newUser.save();
    res.status(201).send('Successfully registered');
  } catch (err) {
    res.send(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUserwithEmail = await UserModel.findOne({ email });
    if (findUserwithEmail) {
      if (findUserwithEmail.password === password) {
        res.status(201).send('Successfully LogedIn');
      } else {
        res.send("Wrong Password");
      }
    } else {
      res.send("Email Not Found, Please Register");
    }
  } catch (err) {
    res.send("Error");
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Successfully connected");
  } catch (err) {
    console.log(err);
  }
});
