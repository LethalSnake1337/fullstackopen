const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const AccountSchema = new mongoose.Schema({
  login: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  fullname: String,
  hashedpass: String,
  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Entry'
    }
  ]
}, { timestamps: true })

AccountSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.hashedpass
  }
})

AccountSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Account', AccountSchema)
