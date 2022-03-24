const jwt = require('jsonwebtoken')

const authorize = (req, res, next) => {

     const authHeader = req.headers["authorization"];
     console.log(authHeader)
     // split the Bearer and token into and array and getting only the token
     const token = authHeader && authHeader.split(" ")[1];

     // const token = req.cookies['token'];

     // if no token 
     if (token == null) {
          console.log('token is empty');
          res.redirect('/user/login')
          return res.status(401)
     };

     // if token exist
     jwt.verify(token, jwt_access_token, (err, authData) => {

          // if token is invalid or expired
          if (err) return res.status(403);

          req.user = authData;

          // console.log(authData)

          next();
     })
}

module.exports = authorize;