const express = require("express");
const dotenv = require("dotenv"); //TO GET VARIABLE ENVIRENMENT FROM THE ".env" FILE
const mongoose = require("mongoose");
const personRouter = require("./routers/person.router.js")
const cors = require("cors");
//* configurer dotenv
dotenv.config()

const app = express()
// transform the body in json useable
app.use(express.json())

// Use cors for connexion security

app.use(cors())

//Routers
app.use(personRouter)

const URI = process.env.MONGO_URI;

mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database is connected"))
    .catch((err) => console.log("database error:" + err));

const port = process.env.PORT;
app.listen(port, () => console.log(`server runing on port ${port}`));
