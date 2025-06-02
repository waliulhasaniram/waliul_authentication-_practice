require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const userRouter = require("./src/routes/user.route")
const connectDB = require("./db")
const cookieParser = require("cookie-parser")

// app.get('/', async (req, res) => {
//     res.status(200).json("this is a test")
// })

app.use(express.json()) //express.json({limit: "30kb"})
app.use(express.urlencoded({extended: true}))

app.use("/api/u", userRouter)
app.use(cookieParser())

connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`this is the server http://localhost:${PORT}`)
    })
})

