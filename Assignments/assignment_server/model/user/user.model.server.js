module.exports = function () {

    var api = {
        createUser: createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser,
        setModel : setModel
    };

    var model = null;
    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {
        delete user._id;
        return UserModel.create(user);
    }

    function findUserById(userId){
        return UserModel.findById(userId)
    }

    function findUserByUsername(uname){
        return UserModel.find({username : uname})
    }

    function findUserByCredentials(uname, pword){
        return UserModel.find({username : uname, password : pword})
    }

    function updateUser (userId, user){
        return UserModel.update({_id : userId},{$set : user});
    }

    function recursiveDelete(websitesOfUser, userId) {
        if(websitesOfUser.length == 0){
            return UserModel.remove({_id: userId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return model.websiteModel.deleteWebsiteAndChildren(websitesOfUser.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(websitesOfUser, userId);
                }
            }, function (err) {
                return err;
            });
    }

    function deleteUser(userId) {
        return UserModel.findById({_id: userId})
            .then(function (user) {
                var websitesOfUser = user.websites;
                return recursiveDelete(websitesOfUser, userId);
            }, function (err) {
                return err;
            });
    }

    function setModel(_model) {
        model = _model;
    }
}