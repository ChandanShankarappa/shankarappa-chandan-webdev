(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {_id: "123", widgetType : "HEADER", pageId: "321", size:"1", text: "GIZMODO"},
            {_id: "234", widgetType : "HEADER", pageId: "123", size:"4", text: "Something"},
            {_id: "345", widgetType : "IMAGE", pageId: "321", width:"90%", url : "https://s-media-cache-ak0.pinimg.com/originals/a2/2a/0a/a22a0a7e624943303b23cc326598c167.jpg"},
            {_id: "456", widgetType : "HTML", pageId: "123", text: "<p>Some text of paragraph</p>"},
            {_id: "567", widgetType : "HEADER", pageId: "321", size:"5", text: "Something else"},
            {_id: "678", widgetType : "YOUTUBE", pageId: "321", width:"75%", url: "https://www.youtube.com/embed/vlDzYIIOYmM"},
            {_id: "789", widgetType : "HTML", pageId: "321", text: "<p>Lorem <i>Ipsum</i> something</p>"}
        ];
        var api = {
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
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
            console.log("createHit");
            console.log(widgets);
            console.log(widget);
           // return angular.copy(widget);
            return widget;
        }

        function findWidgetsByPageId(pageId)
        {
            var widget = [];
            console.log(pageId);
            for(var w in widgets) {
                if( widgets[w].pageId === pageId ) {
                    widget.push(widgets[w]);
                    console.log(widgets[w]);
                    console.log("Hit321");
                }
                console.log("hit function");
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
                else
                {
                    console.log("hittt")
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