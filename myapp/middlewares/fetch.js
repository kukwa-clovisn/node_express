// const express = require('express')
const userModel = require('../database/join')


const getData = (req, res, next) => {
     console.log('starting check..parsing middleware')
     userModel.find({}, (err, data) => {
          if (err) {
               console.log(err)
          }
          // console.log(data)


          next()
     })

}

module.exports = getData;
