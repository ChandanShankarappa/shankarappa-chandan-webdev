(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = registerUser;

        function registerUser(user) {
            if (user.password === vm.vPassword) {
                if (user.username) {
                    var promise = UserService.createUser(user);
                    promise
                        .success(function (user) {
                            var registeredUser = user;
                            $location.url("/user/" + registeredUser._id);
                            console.log(registeredUser);
                        })
                        .error(function (data) {
                            if(data == 420){
                                vm.err = "Username already taken!"
                            }else {
                                vm.err = "Couldn't register.";
                            }
                        })
                }
                else{
                    vm.err = "Enter a valid username."
                }
            }
            else{
                vm.err  = "Passwords don't match. Please re-enter."
            }

        }
    }

})();