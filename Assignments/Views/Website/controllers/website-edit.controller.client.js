(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsitesById(vm.websiteId)
                .success(function (response) {
                    vm.website = response;
                    if(vm.website){
                        WebsiteService
                            .findWebsitesByUser(vm.userId)
                            .success(function (response) {
                                vm.websites = response;
                                if(vm.websites.length == 0){
                                    vm.error = "No websites created yet";
                                }
                            });
                    }
                });
        }
        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .success(function (response) {
                    var website = response;
                    $location.url("user/"+vm.userId+"/website")
                });
        }
        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function (response) {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function (response) {
                    vm.deleteError = "Website could not be deleted, please try again";
                    return;
                });
        }
    }

})();