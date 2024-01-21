// appointmentRoutes.js
const express = require('express')
const appointmentRouter = express.Router()
const Appointment = require('../models/Appointments')

appointmentRouter.post('/appointment', async (req, res) => {
  try {
    const { appointmentTime, vtype, vclass } = req.body
    const newAppointment = new Appointment({ appointmentTime, vtype, vclass })
    const savedAppointment = await newAppointment.save()
    res.status(201).json(savedAppointment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

appointmentRouter.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find()
    res.status(200).json(appointments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = appointmentRouter
