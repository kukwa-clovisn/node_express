const bcrypt = require('bcrypt')


const tokenCheck = async (token, hash, nameCheck) => {
     let salt = await bcrypt.genSalt();
     let newToken = await bcrypt.hash(token, salt);
     let result = await bcrypt.compare(token, hash)
     if (result === true) {
          console.log('login successful..')
          return true;
     } else {
          console.log(`login denied. User ${nameCheck} logging in with a wrong password....`)
          return false;
     }
}


module.exports = tokenCheck;