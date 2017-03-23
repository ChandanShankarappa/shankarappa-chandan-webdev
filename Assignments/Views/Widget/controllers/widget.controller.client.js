
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $location, WidgetService, $sce) {
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
                });
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
        vm.createTEXTWidget     = createTEXTWidget;
        vm.createHTMLWidget     = createHTMLWidget;

        function createTEXTWidget() {
            var widget = {  type: "TEXT",
                text: "Sample text",
                rows: 1,
                placeholder: "Enter some text",
                formatted: false};
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function (response) {
                    var newWidget = response;
                    if(newWidget){
                        console.log(newWidget._id);
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                    }
                })
                .error(function (response) {

                });
        }

        function createHeaderWidget() {
            var newWidget = { "type": "HEADER", "size": 2, "text": "Text"};
            console.log("HIT");
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function(widget){
                    newWidget = widget;
                    console.log(widget);
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ newWidget._id);
                    });

        }

        function createHTMLWidget() {
            var widget = {type: "HTML",
                text: "Sample <i>HTML</i> text"};
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function (response) {
                    var newWidget = response;
                    if(newWidget){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                    }
                })
                .error(function (response) {

                })
        }

        function createYouTubeWidget() {
            var newWidget =  {"type": "YOUTUBE", "width": "100%", "url": "URL"};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function(widget){
                    newWidget = widget;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+ newWidget._id);
                });

        }

        function createImageWidget() {
            var newWidget = { "type": "IMAGE", "width": "100%", "url": "URL"};
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