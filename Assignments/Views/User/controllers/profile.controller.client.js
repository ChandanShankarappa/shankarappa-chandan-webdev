(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        init();

        function updateUser(user) {
            var tempUser = UserService.updateUser(vm.userId, user);
            if(tempUser){
                console.log(tempUser);
                vm.message = "User successfully updated!";
            } else {
                vm.error = "Unable to update user";
            }
        }

        function deleteUser(){
            console.log(vm.userId);
            UserService.deleteUser(vm.userId);
            var index = $location.path().lastIndexOf("/");
            var path = $location.path().substring(0, index);
            index = path.lastIndexOf("/");
            $location.url(path.substring(0, index));
        }
    }
})();