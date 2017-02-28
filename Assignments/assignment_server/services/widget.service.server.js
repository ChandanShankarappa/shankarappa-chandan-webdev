module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgets);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        {_id: "123", widgetType : "HEADER", pageId: "321", size:"1", text: "GIZMODO"},
        {_id: "234", widgetType : "HEADER", pageId: "123", size:"4", text: "Something"},
        {_id: "345", widgetType : "IMAGE", pageId: "321", width:"90%",
            url : "https://s-media-cache-ak0.pinimg.com/originals/a2/2a/0a/a22a0a7e624943303b23cc326598c167.jpg"},
        {_id: "456", widgetType : "HTML", pageId: "123", text: "<p>Some text of paragraph</p>"},
        {_id: "567", widgetType : "HEADER", pageId: "321", size:"5", text: "Something else"},
        {_id: "678", widgetType : "YOUTUBE", pageId: "321", width:"75%",
            url: "https://www.youtube.com/embed/vlDzYIIOYmM"},
        {_id: "789", widgetType : "HTML", pageId: "321", text: "<p>Lorem <i>Ipsum</i> something</p>"}
        ];

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        var wid = ((new Date()).getTime()).toString();
        widget._id = wid;
        widget.pageId = pageId;
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgets(req, res){
        var pageId = req.params.pageId;
        var wids = [];
        for (var w in widgets) {
            if (pageId === widgets[w].pageId) {
                wids.push(widgets[w]);
            }
        }
        res.json(wids);
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
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                return widgets;
            }
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


}



