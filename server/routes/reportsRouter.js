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

//update report name
reportsRouter.post('/report_name/:reportId', async (req, res) => {
    try {
      const { reportId } = req.params
      const { newReportName } = req.body
  
      // newReportName is provided | exception
      if (!newReportName) {
        return res.status(400).json({ error: 'New report name is required' })
      }
  
      // find the report using reportId
      const report = await Report.findById(reportId)
      if (!report) {
        return res.status(404).json({ error: 'Report not found' })
      }

      // updating the reportname
      report.reportname = newReportName
      const updatedReport = await report.save()
  
      res.status(200).json(updatedReport)
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
