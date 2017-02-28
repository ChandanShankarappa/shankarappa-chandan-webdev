(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = registerUser;

        function registerUser(user) {
            var promise = UserService.createUser(user);
            console.log(promise);
            promise
                .success(function (user) {
                    var registeredUser = user;
                    $location.url("/user/" + registeredUser._id);
                    console.log(registeredUser);
                })
                .error(function(){
                    vm.error = "Couldn't register.";
                })


        }
    }

})();