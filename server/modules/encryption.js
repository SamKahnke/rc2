const BCRYPT = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 12;

let publicAPI = {
  encryptPassword: function (password) {
      const SALT = BCRYPT.genSaltSync(SALT_WORK_FACTOR);
      return BCRYPT.hashSync(password, SALT);
    },

  comparePassword: function (candidatePassword, storedPassword) {
      console.log('Comparing passwords...');
      console.log(candidatePassword, storedPassword);

      return BCRYPT.compareSync(candidatePassword, storedPassword);
    },
};

module.exports = publicAPI;
