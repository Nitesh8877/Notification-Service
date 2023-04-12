require("./cron/cron")
const dbConfig = require('./config/db.config')
const mongoose = require('mongoose')
const express = require('express')

const app = express()
app.use(express.json())

mongoose.connect(dbConfig.DB_URL);
app.use(express.json());
const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"));
db.once("open", () => {
    console.log("Connected to mongo DB");
})

let NotificationRoute=require('./routes/ticketNotification.routes');
NotificationRoute(app);

app.listen(3030, () => {
    console.log("Application started on the port num 3030")
})