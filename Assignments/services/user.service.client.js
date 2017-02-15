(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "createUser" : createUser,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser
            //TODO: complete the CRUD functions
            // "createUser": createUser,
            // "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            var userId = (parseInt(users[users.length -1]._id) + 1).toString();
            var newUser = {_id: userId,
                username: user.username,
                password: user.password,
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname};
            users.push(newUser);
            return angular.copy(newUser);
        }

        function findUserByUsername(uName)
        {
            for(var u in users) {
                if( users[u].username === uName ) {
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(userId, newUser) {
            for(var u in users) {
                if( users[u]._id === userId ) {
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].username = user.username;
                    users[u].password = user.password;
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id === userId ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username === username &&
                    users[u].password === password ) {
                    return users[u];
                }
            }
            return null;
        }

        function deleteUser(userId)
        {
            for(var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u,1);
                }
            }
        }
    }
})();