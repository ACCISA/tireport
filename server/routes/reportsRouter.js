// reportRoutes.js
const express = require('express')
const reportsRouter = express.Router()
const Report = require('../models/Reports')

//create a report
reportsRouter.post('/report', async (req, res) => {
  try {
    const {
      appointments,
      reportname,
      numberofappointments,
      numberofturnaway,
      numberofvalidcustomers,
      totalmoney_all,
      totalmoney_turnedaway,
      totalmoney_actual,
    } = req.body
    const newReport = new Report({
      appointments,
      reportname,
      numberofappointments,
      numberofturnaway,
      numberofvalidcustomers,
      totalmoney_all,
      totalmoney_turnedaway,
      totalmoney_actual,
    })
    const savedReport = await newReport.save()
    res.status(201).json(savedReport)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//get all reports - ALL
reportsRouter.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find()
    res.status(200).json(reports)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//get reports - LIMIT of 5
reportsRouter.get('/reportslim', async (req, res) => {
  try {
    const reports = await Report.find({}).limit(5)
    res.status(200).json(reports)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//get reports - Names & id only -> search list
reportsRouter.get('/reportslite', async (req, res) => {
  try {
    const projection = { reportname: 1, _id: 1 }
    const reports = await Report.find({}, projection).exec()
    res.status(200).json(reports)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = reportsRouter
