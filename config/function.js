const bcrypt = require('bcrypt');
const saltRounds = 10;

function encrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}


module.exports = {
  encrypt
};
