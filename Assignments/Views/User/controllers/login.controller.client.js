(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            console.log(user);
            if(user) {
                if (user.username != '\s') {
                    var promise = UserService.findUserByCredentials(user.username, user.password);
                    promise
                        .success(function (user) {
                            var loginUser = user;
                            console.log(user);
                            if (loginUser) {
                                $location.url('/user/' + loginUser._id);
                            } else {
                                vm.error = 'User not found. Please make sure you have keyed in the name properly.';
                            }
                        })
                        .error(function (err) {
                            vm.error = 'User not found. Please make sure you have keyed in the name properly.';
                        });
                } else {
                    vm.error = "Enter a valid username."
                }
            }else{
                vm.error = "Enter username and password."
            }
        }
    }
})();