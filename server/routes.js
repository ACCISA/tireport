const express = require("express")
const cors = require("cors")
const app = express()

const loginRouter = require("./routes/loginRouter")
const registerRouter = require("./routes/registerRouter")
const logoutRouter = require("./routes/logoutRouter")
const appointmentsRouter = require("./routes/appointmentsRouter")
const reportsRouter = require("./routes/reportsRouter")
const cookieParser = require("cookie-parser");

module.exports = function (app) {

    app.use(express.json())
    app.use(cookieParser())

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:5173"
        })
    )

    //POSTS
    app.post("/login", loginRouter)
    app.post("/register", registerRouter)
    app.post("/appointment", appointmentsRouter)
    app.post("/report", reportsRouter)
    app.post("/report_name/:reportId", reportsRouter)
    
    //GETS
    app.get("/logout", logoutRouter)
    app.get("/appointments", appointmentsRouter)
    app.get("/reports", reportsRouter)
    app.get("/reportslim", reportsRouter)
    app.get("/reportslite", reportsRouter)


}

