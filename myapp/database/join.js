var mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
     username: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     },
     userImage: String,
     profileImg: String
}, {
     collection: 'users'
})

const userModel = mongoose.model('userSchema', userSchema)

module.exports = userModel;