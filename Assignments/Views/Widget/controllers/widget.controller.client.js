
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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function(widgets){
                    vm.widgets = widgets;
111                });
        }
        $('#widget-list')
            .sortable({
                axis : "y"
            });

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
            console.log("HIT");
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function(widget){
                    newWidget = widget;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ newWidget._id);
                    });

        }

        function createYouTubeWidget() {
            var newWidget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "100%", "url": "URL"};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function(widget){
                    newWidget = widget;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ newWidget._id);
                });

        }

        function createImageWidget() {
            var newWidget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": "URL"};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function(widget){
                    newWidget = widget;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ newWidget._id);
                });
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
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function(widget){
                    vm.widget = widget;
                });
        }

        init();

        function updateWidget(widget) {
            console.log("updating!");
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .success(function(response){
                    console.log(response);
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                });

        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function(response){
                    if(response){
                        $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                    }
                });
        }
    }
})();