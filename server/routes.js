const express = require("express")
const cors = require("cors")
const app = express()

const loginRouter = require("./routes/loginRouter")
const registerRouter = require("./routes/registerRouter")
const logoutRouter = require("./routes/logoutRouter")
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
    app.get("/logout", logoutRouter)
    app.post("/login", loginRouter)

    app.post("/register", registerRouter)


}

