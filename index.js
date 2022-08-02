import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';
import cors from 'cors'
import env from 'dotenv'

env.config()

const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL

const app = express()

app.use(cors())
app.use(express.json())
app.use(authRouter)


const start = async () => {
  try {
    await mongoose.connect(DATABASE_URL)
    app.listen(PORT, () => console.log(`server has been started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()