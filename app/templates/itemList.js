define([
    'knockout'
    , 'dialogs/UserDetailsDialog'
],
function(
    ko
    , UserDetailsDialog
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
            window.console && console.log("ItemListModel ***** activate ****");
            self.items = data.items;
            self.queryTypes = data.queryTypes;
            self.setActive = data.setActive;

            // default query to view
            self.goToQueryType(self.queryTypes()[0]);
        };

        /** open a modal dialog to show user details */
        self.showUserDialog = function(item) {
            window.console && console.log("showUserDialog " + item);
            UserDetailsDialog.show(item.user);
        };

    };

    return new ItemListViewModel();
});
