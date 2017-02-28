(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.newWebsite = createWebsite;
        vm.userId = $routeParams["uid"];
        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (sites) {
                    vm.websites = sites;
                });
        }

        init();

        function createWebsite(website) {
            console.log("Hit");
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function (response) {
                    var newWebsite = response;
                    if (website) {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function (response) {
                    vm.error = "Could not create website, try again after some time";
                    return;
                });
        }
    }
})();