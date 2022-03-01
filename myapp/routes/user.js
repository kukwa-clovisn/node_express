const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const userModel = require("../database/join");
const postModel = require("../database/post")
const messaegbird = require("messagebird")("xd1lpIuDDkVmXkOhEAu6eBtqd");
require("dotenv").config();
const tokenCheck = require("../middlewares/auth/tokenCheck");
const userAuth = require("../middlewares/auth/userAuth");
const {
     check,
     validationResult
} = require('express-validator')


// setting up the multer =====================================================>
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, "../MYAPP/uploads");
     },
     filename: function (req, file, cb) {
          cb(null, new Date().getTime() + file.originalname);
     },
});

const fileFilter = (req, file, cb) => {
     if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/svg"
     ) {
          cb(null, true);
     } else {
          cb(null, false);
     }
};

const upload = multer({
     storage: storage,
     limits: {
          fileSize: 1024 * 1024,
     },
     fileFilter: fileFilter,
});

router.get("/api/users", (req, res) => {
     userModel.find({}, (err, data) => {
          if (err) {
               console.log(error)
               res.status(404).send(err)
          }
          res.status(200).json(data);
     })

});

router.put("/api/users/:user", (req, res) => {
     const {
          user
     } = req.params;
     const {
          initial_username,
          finam_username,
          initial_email,
          final_email,
          initial_password,
          final_password
     } = req.body;
     console.log(user, "this is the user");
     console.log(initial_username, finam_username, initial_email, final_email, initial_password, final_password, "this are the params");
})

// making a post request to "/api/blog/store" === === === === =>
router
     .route("/login/dashboard/post")
     .get(userAuth, (req, res) => {
          res.render("blog");
     })
     .post((req, res) => {
          let titleArr = req.body.title.split(" ");
          let capitalizedTitle = "";
          for (let i = 0; i < titleArr.length; i++) {
               capitalizedTitle +=
                    titleArr[i].charAt(0).toUpperCase() + titleArr[i].slice(1) + " ";
          }

          let newPost = {
               author: req.body.author,
               title: capitalizedTitle,
               content: req.body.content,
               date: Date(),
          };
          console.log(newPost);
          postModel.create(newPost);
          res.redirect("/users");
          console.log("Done......");
     });

// creating the user sign up api post request=================================>
router
     .route("/join")
     .get((req, res) => {
          res.render("user");
     })
     .post(upload.single("userImage"), [
          check('username').not().isEmpty().withMessage('username can not be empty or only numbers').trim().escape(),
          check('password').isLength({
               min: 5
          }).trim().escape().withMessage('password should contain at least 5 characters'),
          check('email').isEmail().normalizeEmail()
     ], async (req, res) => {
          let checkError = validationResult(req);
          if (!checkError.isEmpty()) {
               let msgs = '';
               for (let i = 0; i < checkError.errors.length; i++) {
                    msgs += checkError.errors[i].msg
               }
               console.log(checkError.errors)
               return res.render('user', {
                    err: true,
                    errormsg: msgs
               })
          }
          try {
               // securing password
               let salt = await bcrypt.genSalt();
               const userKey = await bcrypt.hash(req.body.password, salt);
               console.log(req.file);

               // capitalizing username
               let initialName = "";
               let namesArr = req.body.username.split(" ");
               for (let i = 0; i < namesArr.length; i++) {
                    initialName +=
                         namesArr[i].charAt(0).toUpperCase() + namesArr[i].slice(1) + " ";
                    capitalizedName = initialName.slice(0, -1);
               }

               const {
                    email
               } = req.body;
               let existingEmail = await userModel.findOne({
                    email,
               });
               let existingName = await userModel.findOne({
                    username: capitalizedName,
               });

               if (existingName) {
                    console.log(existingName);
                    console.log(capitalizedName);
                    console.log(`user already exists with name ${req.body.username}`);
                    return res.status(403).render("user", {
                         err: true,
                         errormsg: `Sorry name ${req.body.username} already exist as a user. change username`,
                         signup: "signup",
                    });
               }

               if (existingEmail) {
                    console.log("user email already exist....");
                    return res.status(403).render("user", {
                         err: true,
                         errormsg: ` Sorry ${req.body.username},"${req.body.email}"has already being used. Try to signup with another email address. thanks `,
                         signup: "signup",
                    });
               }

               let newUser = {
                    username: capitalizedName,
                    email: req.body.email,
                    password: userKey,
                    userImage: req.file.path,
                    profileImg: req.file.filename,
               };
               console.log(newUser);
               userModel.create(newUser);
               req.session.isAuth = true;
               res.render("success");

               // res.status(201).render("success", {
               //      status: "sign up",
               // });
               // res.render("userAuth1");
          } catch (err) {
               console.log(err, "error..............");
          }
     });
router.post("/join/tel", (req, res) => {
     let numb = req.body.number;
     console.log(req.body);
     messaegbird.verify.create(
          numb, {
               template: "From CodingHerald, your verification code is... %token",
          },
          (err, response) => {
               if (err) {
                    console.log(err);
                    res.render("userAuth1", {
                         error: err.errors[0].description,
                    });
               } else {
                    console.log(response);
                    res.render("userAuth2", {
                         id: response.id,
                    });
               }
          }
     );
});

router.post("/join/tel/code", (req, res) => {
     let id = req.body.id;
     let password = req.body.password;
     console.log(req.body);

     messaegbird.verify.verify(id, password, (err, response) => {
          if (err) {
               console.log(err);
               res.render("userAuth2", {
                    error: err.errors[0].description,
                    id: id,
               });
          } else {

               userModel.create(newUser);
               req.session.isAuth = true;
               res.render("success");
          }
     });
});

router.get("/dashboard", (req, res) => {
     res.render("dashboard");
});

// login authentication api and middleware===============================>
router.get("/login", (req, res) => {
     res.render("login");
});
router.route("/login/dashboard").get(userAuth, (req, res) => {
     res.render("dashboard")
}).post([
     check('username').not().isEmpty().withMessage('username can not be empty or only numbers').trim().escape(),
     check('password').isLength({
          min: 5
     }).trim().escape().withMessage('password should contain at least 5 characters')
], (req, res) => {
     console.log(req.body);
     const errorResult = validationResult(req);
     if (!errorResult.isEmpty()) {
          console.log(errorResult.errors)
          let msgs = '';
          for (let i = 0; i < errorResult.errors.length; i++) {
               msgs += errorResult.errors[i].msg; + "  "
          }
          return res.render('login', {
               err: true,
               msg: msgs
          })

     }
     let checkUser = req.body.username;

     let searchName = "";
     let firstName = ""
     let nameArr = checkUser.split(" ");
     for (let i = 0; i < nameArr.length; i++) {
          searchName += nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1) + " ";
          firstName = nameArr[0].charAt(0).toUpperCase() + nameArr[0].slice(1);

     }
     console.log(searchName)
     searchName = searchName.slice(0, -1);
     userModel.findOne({
               "username": searchName,
          },
          async (err, data) => {
               if (err) {
                    console.log(err);
               } else {
                    console.log(data.username, searchName);

                    if (data.username === searchName) {
                         let result = await tokenCheck(
                              req.body.password,
                              data.password,
                              req.body.username
                         );

                         if (result === true) {
                              req.session.isAuth = true;



                              res.status(200).render("dashboard", {
                                   idName: data.username,
                                   idEmail: data.email,
                                   idImage: data.profileImg,
                                   firstName: firstName
                              });


                              return console.log(
                                   `user "${req.body.username}" successfully logged in....`
                              );
                         } else {
                              res.status(403).render("login", {
                                   err: true,
                                   errormsg: "incorrect password...!"
                              });
                              return console.log(
                                   `user ${req.body.username} trying to log in with a wrong password.`
                              );
                         }
                    } else {
                         res.status(401).render("login", {
                              err: true,
                              errormsg: `user "${req.body.username}" has no account!`,
                              signup: "signup"
                         });

                         return console.log("user has no account...");
                    }
               }
          }
     );
});
// router.put("/")
module.exports = router;