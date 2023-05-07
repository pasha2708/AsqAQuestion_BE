import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  topic: { type: String, required: true },
  id: { type: String },
})

export default mongoose.model('services', schema)