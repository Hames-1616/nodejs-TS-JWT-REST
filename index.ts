import express from 'express'
import {authRouter}  from './routes/auth'
import mongoose from 'mongoose'

const app  = express()
const port = 8000
const DB = "mongodb+srv://hames:hames@atlascluster.xvj1a2v.mongodb.net/"

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful")
  })
  .catch((e) => {
    console.log(e)
  })
  
app.use(express.json())
app.use(authRouter)

app.get('/', (req , res) => {
  res.send('Express + TypeScript Server')
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
});