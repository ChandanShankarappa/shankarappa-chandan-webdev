(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage" : createPage,
            "findPagesByWebsiteId" : findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (parseInt(pages[pages.length -1]._id) + 1).toString();
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            var sitePages = [];
            for(var p in pages){
                if(pages[p].websiteId === websiteId){
                    sitePages.push(pages[p]);
                }
            }
            return sitePages;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if( pages[p]._id == pageId ) {
                    return pages[p];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if( pages[p]._id === pageId ) {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return pages;
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if (pages[p]._id == pageId) {
                    pages.splice(p,1);
                    return pages;
                }
            }
            return null;
        }
    }
})();