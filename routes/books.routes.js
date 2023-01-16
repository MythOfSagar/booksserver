const { Router } = require("express");
const BooksDataModel = require("../models/books.models");
const { validator, record } = require("../middleware/books.middleware");
const authenticate = require("../middleware/auth.middleware")

const booksRouter = Router();

booksRouter.use(authenticate)
booksRouter.get("/", async (req, res) => {
  let query = {};
  let sort=false
  if (req.query.genre) {
    query["genre"] = req.query.genre;
    console.log(query);
  }
  if(req.query.price==="price_low"){
      sort=1
  }
  else if(req.query.price==="price_high"){
      sort=-1
  }
  

  try {
    if (sort) {
      const BooksData = await BooksDataModel.find(query).sort({ price: sort });
      res.send(BooksData);
    } else {
      const BooksData = await BooksDataModel.find(query);
      res.send(BooksData);
    }
  } catch (err) {
    res.send(`Book DataShow failed because ${err}`);
  }
});

booksRouter.use(record);
booksRouter.delete("/delete/:id", async (req, res) => {
  try {
    await BooksDataModel.findByIdAndDelete(req.params.id);
    res.send(`Book deletion Success`);
  } catch (err) {
    res.send(`Book deletion failed because ${err}`);
  }
});

booksRouter.put("/update/:id", async (req, res) => {
  const updateData = req.body;
  const bookid = req.params.id;
  const book = await BooksDataModel.findOne({ "_id": bookid });
  const usernamefromBook = book.username
  const usernamefromUser = req.body.username
  try {
    if(usernamefromBook!==usernamefromUser){
      res.send(`Book update failed because you are not authenticated`)
    }
    else{
      await BooksDataModel.findByIdAndUpdate(bookid, { ...updateData });
      res.send(`Book updated Success`);
    }
    
  } catch (err) {
    res.send(`Book updated failed because ${err}`);
  }
})

// booksRouter.use(validator);
booksRouter.post("/create", async (req, res) => {
  const dataofBook = req.body;
  // const usernamefromUser = req.body.username
  console.log(dataofBook)
  try {
    const newBook = new BooksDataModel(dataofBook);
    await newBook.save();
    res.send(`Book creation Success`);
  } catch (err) {
    res.send(`Book creation failed because ${err}`);
  }
});

module.exports = booksRouter;
