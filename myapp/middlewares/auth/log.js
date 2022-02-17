const express = require('express')
require("dotenv").config()
const bodyParser = require('body-parser')


const router = express.Router();

router.get('/', (req, res) => {
     res.render('hellooo')
});

router.post('siteLink', (req, res) => {
     let numb = req.body.number;

     messaegbird.verify.create(num, {
          template: "your verification code is....."
     }, (err, res) => {
          if (err) {
               console.log(err)
               res.render('siteLinek', {
                    error: err.errors[0].descriptions
               })
          } else {
               console.log(response)
               res.render('siteLink', {
                    id: res.id
               })
          }
     })
})

router.post('link3', (req, res) => {
     let id = req.body.id;
     let token = req.body.token;

     messaegbird.verify.verify(id, token, (err, response) => {
          if (err) {
               console.log(err);
               res.render('link2', {
                    error: err.errors[0].description,
                    id: id
               })
          } else {
               res.render('link3')
          }
     })
})