require("dotenv").config()

const authorize = (req, res, next) => {
     const authHeader = req.headers['authorization'];
     // slip the Bearer and token into and array and getting only the token 
     const token = authHeader && authHeader.split(" ")[1];

     // if no token 
     if (token == null) return res.status(401)

     // if token exist
     jwt.verify(token, jwt_access_token, (err, authData) => {
          // if token is invalid or expired
          if (err) return res.status(403)
          req.user = authData;
          console.log(req.user, "from authoirze")

          next();
     })
}

module.exports = authorize;