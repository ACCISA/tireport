const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const registerRouter = async (req, res) => {
  const { email, password } = req.body;
  const secret = bcrypt.genSaltSync(10);

  if (email == null || password == null){
    res.status(422).json("missing email and password field");
    return;
  } 
  if (email == undefined || password == undefined){
    res.status(422).json("missing email and password field");
    return;
  }
  console.log("Creating account: "+email+"; "+password)
  try {
    const userDoc = await User.create({
      email,
      password: bcrypt.hashSync(password, secret)
    });
    res.json(userDoc);
  } catch (e) {
    if (e.code == 11000) {
      res.status(422).json("email already associated");
    } else {
      console.log(e)
      res.status(500).json("unknown error");
    }
  }
};

module.exports = registerRouter;