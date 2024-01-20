const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const loginRouter = async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {email,password} = req.body;
  let userDoc = await User.findOne({email});

  if (email == null || password == null){
    res.status(422).json("missing email and password field");
    return;
  } 
  if (email == undefined || password == undefined){
    res.status(422).json("missing email and password field");
    return;
  }

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, process.env.JWT_SECRET, {}, (err,token) => {
        if (err) throw err;
        const tempDoc = {
          ...userDoc._doc,
          token: token
        };
        console.log(tempDoc)
        res.cookie('token', token).json(tempDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
};

module.exports = loginRouter;