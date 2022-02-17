let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let mongoose = require('mongoose');
let path = require('path');
let bodyParser = require('body-parser')
// let posts = require('./public/javascripts/data')
let model = require('../database/post')
let moreRouter = require('../routes/more')
let indexRouter = require('../routes/index');
let blogRouter = require('../routes/blog')
let usersRouter = require('../routes/users');
let createError = require('http-errors');
let getDataRouter = require('../routes/getData')
require('dotenv').config()