(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = registerUser;

        function registerUser(user) {
            var registeredUser = UserService.createUser(user);
            $location.url("/user/" + registeredUser._id);
        }
    }

})();