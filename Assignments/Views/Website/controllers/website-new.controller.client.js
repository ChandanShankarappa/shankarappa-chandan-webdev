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
            console.log(website);
            if(website.name && website.name != "\s"){
                console.log(website.name);
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .success(function (response) {
                        var newWebsite = response;
                        if (website) {
                            $location.url("/user/" + vm.userId + "/website");
                        }
                    })
                    .error(function (response) {
                        if (response == 420) {
                            vm.error = "Website already exists!";
                        } else {
                            vm.error = "Could not create website, try again after some time";
                        }
                    });
            } else{
                console.log(website);
                vm.error = "Website name can't be blank.";
            }
        }
    }
})();