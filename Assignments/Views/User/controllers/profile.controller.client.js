(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(userId)
                .success(renderUser);
        };

        init();

        function updateUser(user) {
            var promise = UserService.updateUser(userId, user);
            promise
                .success(function(tempUser){
                    if(tempUser){
                        vm.message = "User successfully updated!";
                    } else {
                        vm.error = "Unable to update user";
                    }
                })
                .error(function(){
                    vm.error = "Unable to update user";
                });

        }

        function deleteUser(){
            var answer = confirm("Are you sure?");
            if(answer){
                UserService
                    .deleteUser(userId)
                    .success(function(){
                         //var index = $location.path().lastIndexOf("/");
                         //var path = $location.path().substring(0, index);
                         //index = path.lastIndexOf("/");
                         //console.log(index);
                        console.log("Location");
                        $location.url('#/');
                    })
                    .error(function(){
                        vm.error = 'Unable to remove user';
                    });
            }
            //console.log(vm.userId);
            //UserService.deleteUser(vm.userId);
            //var index = $location.path().lastIndexOf("/");
            //var path = $location.path().substring(0, index);
            //index = path.lastIndexOf("/");
            //$location.url(path.substring(0, index));
        }

        function renderUser(user) {
            vm.user = user;
        }
    }
})();