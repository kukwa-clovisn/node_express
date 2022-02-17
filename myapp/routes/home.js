const express = require('express')
const router = express.Router()
const session = require('express-session');
const mongodbConnect = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')
require("dotenv").config()

mongoose.connect("mongodb://localhost:27017/blogdb", {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(res => console.log("mongodb connected....."))


const store = new mongodbConnect({
     uri: "mongodb://localhost:27017/blogdb",
     collection: "sessions"
})

router.use(session({
     secret: 'key',
     resave: false,
     saveUninitialized: false,
     store: store
}))

router.get('/', (req, res) => {
     req.session.isAuth = true;
     console.log(req.session)
     console.log(req.session.id)
     res.render('index')
})

module.exports = router;