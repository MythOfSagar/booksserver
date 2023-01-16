const fs = require("fs");


const validator = (req, res, next) => {
  const dataofBook = req.body;

  if (Object.keys(dataofBook).length === 4) {
    const checkSpecific = () => {
      return Object.keys(dataofBook).map((key) => {
        if (
          key === "title" ||
          key === "author" ||
          key === "price" ||
          key === "genre"
        ) {
          return true;
        } else {
          return false;
        }
      });
    };
    let specificKeys = checkSpecific();
    if (specificKeys.includes(false)) {
      res.send({ err: "All the fields are not there" });
    } else {
      next();
    }
  } else {
    res.send({ err: "All the fields are not there" });
  }
};

const record = (req, res, next) => {
  let type = req.url.split("/")[1];

  if (type === "update" || type === "delete") {
    fs.appendFileSync(
      "records.txt",
      `The document with id:${req.url.split("/")[2]} has been ${type}d \n`,
      "utf8"
    );
  }

  next();
};

module.exports = { validator, record };
