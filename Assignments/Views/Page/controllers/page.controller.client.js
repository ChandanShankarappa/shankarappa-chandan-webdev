(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        //console.log("Controller:"+vm.websiteId);
        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                });

        }

        init();
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.newPage = newPage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .success(function(page){
                    vm.page = page;
                });
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                });
        }

        init();

        function newPage(page) {
            if(page.name && page.name != '\s') {
                var check = 0;
                for (p in vm.pages) {
                    if (page.name == vm.pages[p].name) {
                        check = 1;
                    }
                }
                if (check == 1) {
                    vm.error = "Page already exists";
                } else {
                    PageService
                        .createPage(vm.websiteId, page)
                        .success(function (response) {
                            if (response) {
                                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                            }
                        });
                }
            }else{
                vm.error = "Page name can't be blank!";
            }

        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .success(function(page){
                    vm.page = page;
                });
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                });
        }

        init();

        function updatePage(page) {
            var check = 0;
            if(page.name && page.name!= '\s') {
                for(p in vm.pages){
                    if(page._id != vm.pages[p]._id  && page.name == vm.pages[p].name){
                        check = 1;
                    }
                }
                if(check == 1){
                    vm.error = "Page name already exists."
                }else {
                    PageService
                        .updatePage(vm.pageId, page)
                        .success(function (response) {
                            if (response) {
                                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                            }
                        });
                }
            }else{
                vm.error = "Page name can't be blank!";
            }

        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .success(function(response){
                    if(response){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    }
                });
        }
    }

})();