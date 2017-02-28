(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            console.log(user);
            promise
                .success(function (user) {
                    var loginUser = user;
                    console.log(user);
                    if(loginUser) {
                        $location.url('/user/' + loginUser._id);
                    } else {
                        vm.error = 'user not found';
                    }
                })
                .error(function(err) {
                    vm.error = 'user not found';
                });
        }
    }
})();