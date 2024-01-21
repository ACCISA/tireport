const mangoose = require("mongoose")
const { Schema } = mangoose

const UserSchema = new Schema({
  email: {type: String, unique: true },
  name: {type: String},
  password: String
})

const UserModel = mangoose.model("User", UserSchema);

module.exports = UserModel