const userAuth = (req, res, next) => {
     if (req.session.isAuth) {
          next()
     }
     res.redirect('/user/login')
}

module.exports = userAuth;