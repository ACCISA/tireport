const mangoose = require("mongoose")
const { Schema } = mangoose

const VehicleSchema = new Schema({
  type: {type: String}, //car or truck
  class_: {type: String} //c m full-size or class 1/2
})

const VehicleModel = mangoose.model("Vehicle", VehicleSchema)

module.exports = VehicleModel