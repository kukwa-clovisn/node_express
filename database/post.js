var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
     author: String,
     title: String,
     content: String,
     date: String
}, {
     collection: 'posts'
})

const postModel = mongoose.model('postSchema', postSchema)

module.exports = postModel;

// 1) create an authentication middleware

// 2) create a language middleware that checks which language the users wants and return it in the footer 
// more like checking and configuring the language settings of your blog

// 3) use express to create a server that can serve pictures so your form showld be able to upload pictures