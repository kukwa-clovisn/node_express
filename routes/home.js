const express = require('express');
const router = express.Router();
const session = require('express-session');
const mongodbConnect = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
require("dotenv").config();

const mongo_uri = process.env.MONGO


mongoose.connect(mongo_uri, {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(res => console.log("mongodb connected....."))

const store = new mongodbConnect({
     uri: mongo_uri,
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