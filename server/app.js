const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express()


//const Appointment = require('./models/Appointments')
//const Report = require('./models/Reports')
const port = 4000

require("dotenv").config()
mongoose.connect(process.env.MONGO_URL)

require("./routes")(app)


//app.use(bodyParser.json())
//app.use(express.json())


//Routers
//const appointmentsRouter = require('./routes/appointmentsRouter')
//app.use("/appointments", appointmentsRouter)



//creating an appointment
/*app.post('/appointment', async (req, res) => {
    try {
      const { appointmentTime, vtype, vclass } = req.body
      const newAppointment = new Appointment({ appointmentTime, vtype, vclass })
      const savedAppointment = await newAppointment.save()
      res.status(201).json(savedAppointment)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })*/

//getting appointments
/*app.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find()
        res.status(200).json(appointments)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
  })*/

//creating report
/*app.post('/report', async (req, res) => {
    try {
      const { appointments, reportname, numberofappointments, numberofturnaway, numberofvalidcustomers, totalmoney_all, totalmoney_turnedaway, totalmoney_actual } = req.body
      const newReport = new Report({ appointments, reportname, numberofappointments, numberofturnaway, numberofvalidcustomers, totalmoney_all, totalmoney_turnedaway, totalmoney_actual })
      const savedReport = await newReport.save()
      res.status(201).json(savedReport)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })*/

//getting reports - ALL
/*app.get('/reports', async (req, res) => {
    try {
        //const reports = await Report.find();
        const reports = await Report.find()
        res.status(200).json(reports)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
  })*/

//getting reports - LIMITED
/*app.get('/reportslim', async (req, res) => {
    try {
        //const reports = await Report.find();
        const reports = await Report.find({}).limit(5)
        res.status(200).json(reports)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
  })*/

//getting reports - ALL - name & id only
/*app.get('/reportslite', async (req, res) => {
    try {
        //to specify the fields i want in the search bar
        const projection = { reportname: 1, _id: 1 }
        //const reports = await Report.find({}).limit(5)
        const reports = await Report.find({}, projection).exec()
        
        res.status(200).json(reports)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
  })*/


 

//creating vehicle records - test
// new vehicle record - POST request

/* Having vehicles is necessary as we insert the id of each in the records  */

/*app.post('/vehicles', async (req, res) => {
    try {
      const { type, class_ } = req.body;
      const newVehicle = new Vehicle({ type, class_ });
      const savedVehicle = await newVehicle.save();
      res.status(201).json(savedVehicle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  app.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  })
*/


//basic running test
app.get("/test", (req, res) => {
    res.json('test ok')
})

app.listen(port, () => console.log('Listening on port '+port+'...'))

