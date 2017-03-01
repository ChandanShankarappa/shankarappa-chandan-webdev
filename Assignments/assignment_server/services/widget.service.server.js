module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgets);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pid/widget", updateWidgetOrder);

    var widgets = [
        {_id: "123", widgetType : "HEADER", pageId: "321", size:"1", text: "GIZMODO", index : 1},
        {_id: "234", widgetType : "HEADER", pageId: "123", size:"4", text: "Something" , index : 2},
        {_id: "345", widgetType : "IMAGE", pageId: "321", width:"90%",
            url : "https://s-media-cache-ak0.pinimg.com/originals/a2/2a/0a/a22a0a7e624943303b23cc326598c167.jpg", index : 3},
        {_id: "456", widgetType : "HTML", pageId: "123", text: "<p>Some text of paragraph</p>", index : 4},
        {_id: "567", widgetType : "HEADER", pageId: "321", size:"5", text: "Something else", index : 5},
        {_id: "678", widgetType : "YOUTUBE", pageId: "321", width:"75%",
            url: "https://www.youtube.com/embed/vlDzYIIOYmM", index : 6},
        {_id: "789", widgetType : "HTML", pageId: "321", text: "<p>Lorem <i>Ipsum</i> something</p>", index : 7}
        ];

    function createWidget(req, res){
        var pageId = req.params.pageId;
        var widget = req.body;
        var wid = ((new Date()).getTime()).toString();
        // Find the highest index in that page and increment it by 1 for the new widget
        var sortedWidgetsList = widgets.filter(function (w) {
            return w.pageId == pageId;
        })
            .sort(function (a, b) {
                return a.index < b.index;
            });
        var newHighestIndex = 0;
        if(sortedWidgetsList.length != 0){
            newHighestIndex = sortedWidgetsList[0].index + 1;
        }
        var newIndex = newHighestIndex;
        console.log(newIndex);

        widget._id = wid;
        widget.pageId = pageId;
        widget.index = newIndex;
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgets(req, res){
        var pageId = req.params.pageId;
        var widgetsList = widgets.filter(function(widget){
            return widget.pageId === pageId;
        });
        // Sort by index
        var sortedWidgetList = widgetsList.sort(function (widgeta, widgetb) {
            return widgeta.index > widgetb.index;
        })
        res.json(sortedWidgetList);
    }

    function findWidgetById(req, res){
        var wid = req.params.widgetId;
        var widget = widgets.find(function (widgetObject) {
            return widgetObject._id == wid;
        });
        res.json(widget);
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets) {
             if( widgets[w]._id === widgetId ) {
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
                res.json(widget);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res){
        var wgid = req.params.widgetId;
        var deletedIndex, deletedWidgetPageId;
        for(var i in widgets) {
            var widget = widgets[i];
            if( widget._id === wgid ) {
                deletedIndex = widget.index;
                deletedWidgetPageId = widget.pageId;
                if(widget.widgetType === "IMAGE"){
                    // Remove the uploaded image
                    var imageName = widget.url.split('//').pop().split("/").pop();
                }
                widgets.splice(i,1);
                updateIndexesAfterDelete(deletedIndex, deletedWidgetPageId);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateIndexesAfterDelete(deletedIndex, deletedWidgetPageId) {
        var widgetsToUpdate = widgets.filter(function (w) {
            return w.pageId == deletedWidgetPageId;
        })
        var widgetsToUpdateIndex = widgetsToUpdate.filter(function (w) {
            return w.index > deletedIndex;
        })
        if(widgetsToUpdateIndex){
            widgetsToUpdateIndex.map(function (widget) {
                widget.index--;
            })
        }
    }

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res){
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var myFile = req.file;

        var originalname = myFile.originalname;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var iWid = widgets.find(function (widget) {
            return widget._id == widgetId;
        })
        iWid.width = width;
        iWid.url = req.protocol + '://' +req.get('host')+"/Assignments/public/uploads/"+myFile.filename;
        console.log(iWid.url);
        res.redirect("/Assignments/#/user/"+uid+"/website/"+wid+"/page/"+iWid.pageId+"/widget");
    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pid;
        var startIndex = req.query.initial;
        var endIndex = req.query.final;
        var widgetsOfPage = widgets.filter(function (w) {
            return w.pageId === pageId;
        });

        console.log("Start"+startIndex);
        var fromWidget = {};
        console.log(fromWidget);
        console.log(widgetsOfPage);
        console.log(startIndex+","+endIndex);
        for (var i in widgetsOfPage){
            if (widgetsOfPage[i].index == startIndex) {
                fromWidget = widgetsOfPage[i];
            }
        }
        console.log("From and to");
        console.log(fromWidget);

        var toWidget = {};
        for (var i in widgetsOfPage){
            if (widgetsOfPage[i].index == endIndex){
                toWidget = widgetsOfPage[i];
            }
        }

        console.log(toWidget);
        console.log("from "+toWidget.index);

        fromWidget.index = endIndex;
        console.log("changing");

        if(startIndex < endIndex){
            // A widget moved down
            // Other widget index -= 1
            widgetsOfPage.filter(function (w) {
                return w.index > startIndex && w.index < endIndex;
            }).map(function (w) {
                w.index -= 1;
            });
            toWidget.index -=1;
        }
        else {
            // A widget moved up
            // Other widget index += 1
            widgetsOfPage.filter(function (w) {
                return w.index < startIndex && w.index > endIndex;
            }).map(function (w) {
                w.index += 1;
            });
            toWidget.index +=1;
        }
        res.sendStatus(200);
    }




}



