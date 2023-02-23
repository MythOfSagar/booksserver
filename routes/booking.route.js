const { Router } = require("express");

const {
  bookFlightForSpecificUser,
} = require("../middleware/booking.middleware");
const bookingRouter = Router();
const { BookingModel } = require("../models/booking.model");

bookFlightForSpecificUser();

bookingRouter.post("/", async (req, res) => {
  const { id } = req.headers.authorization;
  const {flight} = req.body;

  try {
    const newBooking = new BookingModel({ user:id,  flight:flight });
    await newBooking.save();
    res.status(201).send("Successfully Created Booking");
  } catch (err) {
    res.send(err);
  }
});

module.exports = { bookingRouter };
