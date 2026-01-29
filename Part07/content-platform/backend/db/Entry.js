const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
  heading: String,
  writer: String,
  resource: String,
  votes: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  feedback: {
    type: Array,
    default: []
  }
}, { timestamps: true })

EntrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Entry', EntrySchema)
