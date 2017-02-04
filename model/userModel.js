var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
    login: String,
    password: String
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var userModel = mongoose.model('User', userSchema);

userModel.find({}).then(
    function(users) {
        if (users.length == 0) {
            var user = new userModel({
                login: 'admin',
                password: bcrypt.hashSync('admin', bcrypt.genSaltSync(8), null)
            });

            user.save();
        }
    });

module.exports = userModel;