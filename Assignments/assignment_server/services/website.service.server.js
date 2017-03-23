// module.exports = function (app) {
//     app.post("/api/user/:userId/website", createWebsite);
//     app.get("/api/user/:userId/website", findAllWebsites);
//     app.get("/api/website/:websiteId", findWebsiteById);
//     app.put("/api/website/:websiteId", updateWebsite);
//     app.delete("/api/website/:websiteId", deleteWebsite);
//
//
//     var websites = [
//         { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
//         { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
//         { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
//         { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
//         { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
//         { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
//     ];
//
//     function createWebsite(req, res){
//         var userId = req.params.userId;
//         var newSite = req.body;
//         var wid = ((new Date()).getTime()).toString();
//         var newWebsite = {_id: wid,
//             name: newSite.name,
//             developerId: userId,
//             description: newSite.description};
//         websites.push(newWebsite);
//         console.log(newWebsite);
//         res.json(newWebsite);
//     }
//
//     function findAllWebsites(req, res) {
//         var userId = req.params.userId;
//
//         var sites = [];
//         for (var w in websites) {
//             if (userId === websites[w].developerId) {
//                 sites.push(websites[w]);
//             }
//         }
//         res.json(sites);
//     }
//
//     function findWebsiteById(req, res){
//         var websiteId = req.params.websiteId;
//         var website = websites.find(function (websiteObject) {
//             return websiteObject._id == websiteId;
//         });
//         res.json(website);
//     }
//
//     function updateWebsite(req, res){
//         var websiteId = req.params.websiteId;
//         var updatedWebsite = req.body;
//         for(var i in websites) {
//             var website = websites[i];
//             if( website._id === websiteId ) {
//                 websites[i].name = updatedWebsite.name;
//                 websites[i].description = updatedWebsite.description;
//                 res.json(website);
//             }
//         }
//     }
//
//     function deleteWebsite(req, res){
//         var websiteId = req.params.websiteId;
//         for(var i in websites) {
//             var website = websites[i];
//             if( website._id === websiteId ) {
//                 websites.splice(i,1);
//                 res.sendStatus(200);
//                 return;
//             }
//         }
//         res.sendStatus(404);
//     }
// }

module.exports = function (app, websiteModel) {
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res){
        var userId = req.params.userId;
        var newwebsite = req.body;

        websiteModel
            .createWebsiteForUser(userId, newwebsite)
            .then(function (website) {
                res.json(website);
            },function (err) {
                res.sendStatus(404);
            });
    }
    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.sendStatus(404);
            });
    }
    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var updatedWebsite = req.body;
        websiteModel
            .updateWebsite(websiteId, updatedWebsite)
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
    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
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