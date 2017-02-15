
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
        vm.checkHTMLSafety= checkHTMLSafety;
        vm.checkYouTubeURLSafety = checkYouTubeURLSafety;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();

        function checkYouTubeURLSafety(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }


        function checkHTMLSafety(html){
            return $sce.trustAsHtml(html);
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
        vm.createHTMLWidget = createHTMLWidget;

        function createHeaderWidget() {
            var newWidget = { "_id": "", "widgetType": "HEADER", "pageId": "", "size": 2, "text": "Text"};
            newWidget = WidgetService.createWidget(vm.pageId, newWidget);
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

        function createHTMLWidget() {
            var newWidget = { "_id": "", "widgetType": "HTML", "pageId": "", "text": "<p>Lorem ipsum</p>"};
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