(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var users = [
            {_id: "123", email : "wonderalice@gmail.com", username: "alice",
                password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", email : "marleybob@mail.com", username: "bob",
                password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", email : "garciacgarly@mail.com", username: "charly",
                password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", email : "annunzijose@gmail.com", username: "jannunzi",
                password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "createUser" : createUser,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserByUsername(uName)
        {
            return $http.get("/api/user?username="+username);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function deleteUser(userId)
        {
            $http.delete("/api/user/"+userId);
            console.log(userId);
        }
    }
})();
