const mongoose = require('mongoose');

const uriSchema = mongoose.Schema({
     urlCode: String,
     longUrl: String,
     shortUrl: String,
     date: {
          type: String,
          defaullt: new Date()
     }
}, {
     collection: 'URL'
})

const uriModel = mongoose.model('uriSchema', uriSchema);

module.exports = uriModel;