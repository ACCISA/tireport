const express = require("express");
const app = express()
const mongoose = require("mongoose");

require("dotenv").config()
mongoose.connect(process.env.MONGO_URL)

require("./routes")(app)
const port = 4000
app.get("/test", (req, res) => {
    res.json('test ok')
})

app.listen(port, () => console.log('Listening on port '+port+'...'))