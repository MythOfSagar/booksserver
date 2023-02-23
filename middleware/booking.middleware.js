const UserModel = require("../models/user.model");

const bookFlightForSpecificUser = async (req, res, next) => {
  const { id } = req.headers.authorization;
  try {
    const userById = await UserModel.findById(id);

    if (userById) {
      next();
    } else {
      res.send("Login to Book Flights");
    }
  } catch (err) {
    res.send("Error ");
  }
};

module.exports = { bookFlightForSpecificUser };
