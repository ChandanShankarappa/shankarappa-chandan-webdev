// module.exports = function(app){
//     app.post("/api/website/:websiteId/page", createPage);
//     app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
//     app.get("/api/page/:pageId", findPageById);
//     app.put("/api/page/:pageId", updatePage);
//     app.delete("/api/page/:pageId", deletePage);
//
//     var pages = [
//         { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//         { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//         { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
//     ];
//
//     function createPage(req, res){
//         var wid = req.params.websiteId;
//         var newPage = req.body;
//         var pid = ((new Date()).getTime()).toString();
//         var page = {_id: pid,
//             name: newPage.name,
//             websiteId: wid,
//             description: newPage.description};
//         pages.push(page);
//         res.json(pages);
//     }
//
//     function findAllPagesForWebsite(req, res){
//         var wid = req.params.websiteId;
//         //var pagesList = pages.filter(function (page) {
//         //    return page.websiteId === wid;
//         //});
//         //res.json(pagesList);
//         var p = [];
//         for (var w in pages) {
//             if (wid === pages[w].websiteId) {
//                 p.push(pages[w]);
//             }
//         }
//         console.log(p);
//         res.json(p);
//     }
//
//     function findPageById (req, res){
//         var pid = req.params.pageId;
//         var page = pages.find(function (pageObject) {
//             return pageObject._id == pid;
//         });
//         res.json(page);
//     }
//
//     function updatePage(req, res){
//         var pid = req.params.pageId;
//         var updatedPage = req.body;
//         for(var i in pages) {
//             var page = page[i];
//             if( page._id === pid ) {
//                 pages[i].name = updatedPage.name;
//                 pages[i].description = updatedPage.description;
//                 res.json(page);
//             }
//         }
//     }
//
//     function deletePage(req, res){
//         var pid = req.params.pageId;
//         for(var i in pages) {
//             var page = pages[i];
//             if( page._id === pid ) {
//                 pages.splice(i,1);
//                 res.sendStatus(200);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
// }
//

module.exports = function (app, pageModel) {
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res){
        var wid = req.params.websiteId;
        var newPage = req.body;
        pageModel
            .createPage(wid, newPage)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function findAllPagesForWebsite(req, res){
        var wid = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(wid)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function findPageById(req, res){
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function updatePage(req, res){
        var pageId = req.params.pageId;
        var updatedPage = req.body;
        pageModel
            .updatePage(pageId, updatedPage)
            .then(function (response) {
                if(response.ok === 1 && response.n === 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function deletePage(req, res){
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
};
