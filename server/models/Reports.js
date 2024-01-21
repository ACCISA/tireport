const mangoose = require("mongoose")
const { Schema } = mangoose

//to create a collection of appointments taken from csv
//var  Appointment = mangoose.model('Appointments') 

const Appointment = require('./Appointments')

const ReportsSchema = new Schema({
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
    //adminid: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    reportname: { type : String},
    numberofappointments: { type : Number},
    numberofturnaway: { type : Number},
    numberofvalidcustomers: { type : Number},
    totalmoney_all: { type : Number},
    totalmoney_turnedaway: { type : Number},
    totalmoney_actual: { type : Number}
}, {timestamps: true})

const ReportsModel = mangoose.model("Report", ReportsSchema)

module.exports = ReportsModel