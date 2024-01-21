const mangoose = require("mongoose")
const { Schema } = mangoose
const AutoIncrement = require('mongoose-sequence')(mangoose)
const AppointmentsSchema = new Schema({
    //requestedAt: { type : Date, default: Date.now },
    id: { type : Number, unique : true},
    appointmentTime: { type : Date },
    vtype: {type : String},
    vclass : {type : String},
}, {timestamps: true})

AppointmentsSchema.plugin(AutoIncrement, { inc_field: 'id' })

const AppointmentsModel = mangoose.model("Appointments", AppointmentsSchema)

module.exports = AppointmentsModel