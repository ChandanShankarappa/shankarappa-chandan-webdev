(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init(){
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
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
            vm.page = PageService.findPageById(vm.pageId);
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }

        init();

        function newPage(page) {
            PageService.createPage(vm.websiteId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
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
            vm.page = PageService.findPageById(vm.pageId);
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }

        init();

        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }

})();