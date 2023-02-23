const { Router } = require("express");

const flghtRouter = Router();
const { FlightModel } = require("../models/flight.model");

flghtRouter.get("/", async (req, res) => {
  try {
    const allFlights = await FlightModel.find();

    res.status(200).send(allFlights);
  } catch (err) {
    res.status(500).send(err);
  }

});

flghtRouter.get("/:id", async (req, res) => {

     const {id} =req.params
     
    try {
      const singleFlight = await FlightModel.findById(id);
  
      res.status(200).send(singleFlight);
    } catch (err) {
      res.status(500).send(err);
    }
  
  });


  flghtRouter.delete("/:id", async (req, res) => {
    const {id} =req.params
    console.log(id)

   try {
      await FlightModel.findByIdAndDelete(id);
     res.status(202).send('Succcessfully deleted');
   } catch (err) {
     res.status(500).send(err);
   }
 
 });

 flghtRouter.patch("/:id", async (req, res) => {
    const {id} =req.params
    const udatedDetails = req.body;

   try {
      await FlightModel.findByIdAndUpdate(id,{...udatedDetails});
      
     res.status(204).send(udatedDetails);

   } catch (err) {
     res.status(500).send(err);
   }
 
 });

flghtRouter.post("/", async (req, res) => {
  const newFlightDetails= req.body;

  try {
    const newFlight = new FlightModel({...newFlightDetails    });
    await newFlight.save();
    res.status(201).send('Successfully Created Flight');
  } catch (err) {
    res.send(err);
  }
});

module.exports = { flghtRouter };
