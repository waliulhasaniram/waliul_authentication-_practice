require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const userRouter = require("./src/routes/user.route")
const connectDB = require("./db")
const cookieParser = require("cookie-parser")

const cors = require("cors")

const corsOptions = {
    origin: process.env.frontend_link,
    method: "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
    credential : true
}

app.use(cors(corsOptions))

app.use(express.json()) //express.json({limit: "30kb"})
app.use(express.urlencoded({extended: true}))

app.use("/api/u", userRouter)
app.use(cookieParser())

connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`this is the server http://localhost:${PORT}`)
    })
})

