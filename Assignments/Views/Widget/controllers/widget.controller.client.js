
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.checkSafeURL = checkSafeURL;
        vm.getSafeHTML = getSafeHTML;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();

        function checkSafeURL(widgetUrl) {
            var parts = widgetUrl.split('/');
            var id = parts[parts.length-1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }


        function getSafeHTML(text) {
            return $sce.trustAsHtml(text);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.createHeaderWidget = createHeaderWidget;
        vm.createYouTubeWidget = createYouTubeWidget;
        vm.createImageWidget = createImageWidget;

        function createHeaderWidget() {
            var newWidget = { "_id": "", "widgetType": "HEADER", "pageId": "", "size": 2, "text": "Text"};
            console.log("hit");
            newWidget = WidgetService.createWidget(vm.pageId, newWidget);
            console.log(newWidget)
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ newWidget._id);
        }

        function createYouTubeWidget() {
            var newWidget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "100%", "url": "URL"};
            newWidget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ newWidget._id);
        }

        function createImageWidget() {
            var newWidget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": "URL"};
            newWidget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ newWidget._id);
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
        }
    }
})();