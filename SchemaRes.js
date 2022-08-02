import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  date: { type: String, required: true },
  text: { type: String, required: true },
})

export default mongoose.model('questionsRes', schema)