const express = require("express");
const booksRouter = require("./routes/books.routes");
require("dotenv").config();
const connection = require("./config/db");
const UserModel = require("./models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors')

const app = express();

app.use(cors({origin:"*"}))

app.use(express.json());

app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.send("HOME page of Book API");
});

app.post("/signin", async (req, res) => {
  const { email, pass, username } = req.body;
  try {
    bcrypt.hash(pass, 4, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, pass: hash, username });
        await user.save();
        res.send("Registartion Successful");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, async (err, result) => {
        if (result) {
          const token = jwt.sign({ course: "backend" }, "masai");
          res.send(`Login Successful ${token}`);
        } else {
          res.send("Wrong creds");
        }
      });
    } else {
      res.send("Wrong creds");
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server running on Port ${process.env.port}`);
});
