var express = require('express');
var router = express.Router();
const postModel = require('../database/post')
const authorize = require('../middlewares/auth/authorize')

router.use((req, res, next) => {
     console.log(req.url, "@", new Date());
     next();
})
/* GET users listing. */
router.get('/', (req, res) => {
     console.log(req.user);
     postModel.find({}, (err, data) => {
          if (err) {
               console.log(err);
          }
          if (data.length > 0) {
               return res.status(200).render("allUsers", {
                    posts: data,
               });
          }
          return res.status(404).render("allUsers", {
               oops: "no items found!",
          })
     })
})


// creating api=================================================>
let userApi = [];
router.get("/api/all", authorize, (req, res) => {
     console.log(req.headers['authorization'])
     console.log(req.user)
     postModel.find({}, (err, data) => {
          if (err) {
               console.log(err);
          }
          userApi = data;
          res.json(userApi);
     });
});


// search api==================================================================>
router.post("/blog/search", async (req, res) => {
     console.log(req.body.search)
     postModel.find({}, (err, data) => {
          if (err) {
               return console.log(err);
          }
          // getting the search text and capitalizing the text
          let textArr = req.body.search.split(" ");
          let capitalizedText = "";
          for (let i = 0; i < textArr.length; i++) {
               capitalizedText =
                    textArr[i].charAt(0).toUpperCase() + textArr[i].slice(1) + "";
          }
          console.log(capitalizedText)
          // filtering the database to look if search text exists
          let searchList = data.filter((user) => {
               return user.title.includes(capitalizedText);
          });
          console.log(searchList)
          if (searchList.length > 0) {
               console.log(searchList);
               return res.status(200).render("allUsers", {
                    posts: searchList,
               });
          }
          return res.status(404).render("allUsers", {
               oops: "Ooooops!",
               noUser: `no matching title =" ${req.body.search}"`,
          });
     });
});

module.exports = router;