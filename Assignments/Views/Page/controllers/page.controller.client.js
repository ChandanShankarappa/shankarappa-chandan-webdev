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
            PageService
                .createPage(vm.websiteId, page)
                .success(function(response){
                    if(response){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    }
                });

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
            PageService
                .updatePage(vm.pageId, page)
                .success(function(response){
                    if(response){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    }
                });

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