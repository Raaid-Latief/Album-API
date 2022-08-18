const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM albums", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

//ADDING A NEW POST
router.post("/", (req, res) => {
    const {
      album_id,
      title,
      genre,
      date,
      description,
     imgURL,
     review,
     
    } = req.body;
    try {
      con.query(
        `INSERT INTO albums ( album_id,title,genre,date,description,imgURL,review) VALUES ("${album_id}","${title}", "${genre}", "${date}", "${description}", "${imgURL}", "${review}")`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

//   DELETE BY ID
  router.delete("/:id", (req, res) => {
    try {
      con.query(
        `DELETE FROM users WHERE album_id=${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

module.exports = router;