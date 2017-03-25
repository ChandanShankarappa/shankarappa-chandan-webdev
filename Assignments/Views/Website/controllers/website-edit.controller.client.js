(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        console.log("web:" +vm.websiteId);
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (response) {
                    vm.website = response;
                    if(vm.website){
                        console.log(vm.website);
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
            var check = 0;
            if(website.name && website.name != "\s") {
                for (w in vm.websites) {
                    if (vm.websites[w]._id != website._id && vm.websites[w].name == website.name) {
                        check = 1;
                    }
                }
                if (check == 1) {
                    vm.error = "Website name already exists.";
                } else {
                    WebsiteService
                        .updateWebsite(vm.websiteId, website)
                        .success(function (response) {
                            var website = response;
                            $location.url("user/" + vm.userId + "/website")
                        });
                }
            }else{
                vm.error = "Website name can't be blank.";
            }
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