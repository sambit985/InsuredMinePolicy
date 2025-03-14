const mongoose = require('mongoose');
const userAccountSchema = new mongoose.Schema({ account_name: String });
const UserAccount = mongoose.model('UserAccount', userAccountSchema);
module.exports = UserAccount;
