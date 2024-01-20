const mangoose = require("mongoose");
const { Schema } = mangoose;

const AppointmentsSchema = new Schema({
    id_user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    id_vehicle : {type:mongoose.Schema.Types.ObjectId, ref:"Vehicle"},
    createdAt: { type : Date, default: Date.now }
});

const AppointmentsModel = mangoose.model("Appointment", AppointmentsSchema);

module.exports = AppointmentsModel;