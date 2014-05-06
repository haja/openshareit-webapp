define([
    'knockout'
],
function(
    ko
) {
    function ItemListViewModel () {
        var self = this;

        self.lastQuery = ko.observable();

        self.goToQueryType = function(queryType) {
            window.console&&console.log("query: " + queryType.name);
            self.lastQuery(queryType.name);
            queryType.query();
        };

        self.activate = function(data) {
            window.console && console.log("ItemListModel ***** activate ****", data, data.items());
            self.items = data.items;
            self.queryTypes = data.queryTypes;
            self.actions = data.actions;

            // default query to view
            self.goToQueryType(self.queryTypes()[0]);
        };
    };

    return new ItemListViewModel();
});
