/**
 * authentication the user by addign sessions to the request when ever the user successfully logs in.
 */
const userAuth = (req, res, next) => {
     //if log in is successful....
     if (req.session.isAuth) {

          next()
     }
     //else redirect to the log in route 
     res.redirect('/user/login')
}

module.exports = userAuth;