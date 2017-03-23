// module.exports = function (app) {
//     app.get("/api/user", findUser);
//     app.get("/api/user/:userId", findUserByUserId);
//     app.put("/api/user/:userId", updateUser);
//     app.delete("/api/user/:userId", deleteUser);
//     app.post("/api/user", createUser);
//
//      var users = [
//          {_id: "123", username : "alice", password : "alice", email:"alice@gmail.com", firstName: "Alice", lastName: "Wonder"},
//          {_id: "234", username : "bob", password : "bob", email:"bob@gmail.com", firstName: "Bob", lastName: "Marley"},
//          {_id: "345", username : "charly", password : "charly", email:"charly@gmail.com", firstName: "Charly", lastName: "Garcia"},
//          {_id: "456", username : "jannunzi", password : "jannunzi", email:"jannunaziato@gmail.com", firstName: "Jose", lastName: "Annunzi"}
//      ];
//
//     function deleteUser(req, res) {
//         var userId = req.params.userId;
//         for(var u in users) {
//             if(users[u]._id === userId) {
//                 users.splice(u, 1);
//                 res.sendStatus(200);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
//
//     function createUser(req, res) {
//         var newUser = req.body;
//         newUser._id = (new Date()).getTime() + "";
//         users.push(newUser);
//         res.json(newUser);
//     }
//
//     function updateUser(req, res) {
//         var userId = req.params['userId'];
//         for(var u in users) {
//             var user = users[u];
//             if( user._id === userId ) {
//                 users[u].firstName = user.firstName;
//                 users[u].lastName = user.lastName;
//                 res.sendStatus(200);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
//
//     function findUserByUserId(req, res) {
//         var userId = req.params['userId'];
//         for(var u in users) {
//             var user = users[u];
//             if( user._id === userId ) {
//                 res.send(user);
//                 return;
//             }
//         }
//         res.sendStatus(404).send({});
//     }
//
//     function findUser(req, res) {
//         var username = req.query['username'];
//         var password = req.query['password'];
//         if(username && password) {
//             findUserByCredentials(req, res);
//         } else if(username) {
//             findUserByUsername(req, res);
//         }
//     }
//
//     function findUserByUsername(req, res) {
//         var username = req.query['username'];
//         var user = users.find(function(u){
//             return u.username == username;
//         });
//         if(user) {
//             res.send(user);
//         } else {
//             res.sendStatus(404).send('User not found for username: ' + username);
//         }
//     }
//
//     function findUserByCredentials(req, res){
//         var username = req.query['username'];
//         var password = req.query['password'];
//         var user = users.find(function(u){
//             return u.username == username && u.password == password;
//         });
//         if(user) {
//             res.send(user);
//         } else {
//             res.sendStatus(404).send('User not found for username: ' + username + ' and password: ' + password);
//         }
//     }
// };

module.exports = function (app, userModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(req,res);
        }
        else if(username){
            findUserbyUsername(req,res);
        }
    }
    function findUserbyUsername(req, res) {
        var usernamesent = req.query.username;
        userModel
            .findUserbyUsername(usernamesent)
            .then(function (users) {
                if(users.length != 0){
                    res.json(users[0]);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }
    function findUserByCredentials(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];

        userModel
            .findUserByCredentials(username, password)
            .then(function (response) {
                if(response.length != 0){
                    res.json(response[0]);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }
    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(500).send(err);
            });
    }
    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function (response) {
                if(response.nModified === 1){
                    // Update was successful
                    userModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        },function () {
                            res.sendStatus(404);
                        })
                }
                else{
                    res.sendStatus(404);
                }
            },function () {
                res.sendStatus(404);
            });
    }
    function createUser(req, res){
        var user = req.body;
        var newUser = {
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname};
        userModel
            .createUser(newUser)
            .then(function (newUser) {
                res.json(newUser);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }
    function deleteUser(req, res) {
        var userId = req.params.userId;
        console.log(userId);
        userModel
            .deleteUser(userId)
            .then(function (response) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(404);
            });
    }
}