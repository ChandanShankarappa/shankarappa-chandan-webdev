(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);
    console.log("hit");

    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({axis: 'y'});
        }
        return {
            link: linkFunc
        };
    }
})();