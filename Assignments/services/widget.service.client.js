(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deletePage
            //TODO: complete the CRUD functions
            // "createUser": createUser,
            // "deleteUser": deleteUser
        };
        return api;

        function createWidget(pageId, widget)
        {
            widget.pageId = pageId;
            widget._id = ((new Date()).getTime()).toString();
            widgets.push(widget);
            return angular.copy(widget);
        }

        function findWidgetsByPageId(pageId)
        {
            var widget = [];
            for(var w in widgets) {
                if( widgets.pageId == pageId ) {
                    widget.push(widgets[w]);
                }
            }
            return widget;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if( widgets[w]._id == widgetId ) {
                    return widgets[w];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if( widgets[w]._id == widgetId ) {

                    if( widget.widgetType == "HEADER"){
                        widgets[w].size = widget.size;
                        widgets[w].text = widget.text;
                    }
                    if( widget.widgetType == "IMAGE"){
                        widgets[w].widht = widget.width;
                        widgets[w].url = widget.url;
                    }
                    if( widget.widgetType == "YOUTUBE"){
                        widgets[w].width = widget.width;
                        widgets[w].url = widget.url;

                    }
                    if( widget.widgetType == "HTML"){
                        widgets[w].text = widget.text;
                    }
                    return widgets;
                }
            }
            return null;
        }

        function deleteWidget(widgetId)
        {
            for(var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }
    }
})();