(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var websites = [
            { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        }

        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website", website);
            console.log("Client : "+website);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+websiteId);
        }

        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+websiteId, website);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }
    }
})();