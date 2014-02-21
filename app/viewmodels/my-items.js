define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'plugins/router'
    , 'dialogs/CreateAddressDialog'
],
function(
    ko
    , holder
    , jsonHelper
    , router
    , CreateAddressDialog
) {
    // TODO move to own module
    function QueryType(name, query, resultProperty) {
        var self = this;
        self.name = name;

        var api_url = "../../api/"
        var reloadHolder = function() {
            holder.compositionComplete();
        }

        self.query = function() {
            jsonHelper.getItems(api_url + query, resultProperty, reloadHolder);
        };
    };

    var ViewModel = function() {
        var self = this;

        // data
        self.items = ko.observableArray([]);

        // TODO move to own util (queryTypeSwitcher)
        self.lastItemType = ko.observable();
        self.itemTypes = ko.observableArray([
            new QueryType('Meine Artikel', 'items_my', self.items)
            , new QueryType('Angefragte Artikel', 'items_queried', self.items)
            , new QueryType('Abgeholte Artikel', 'items_picked_up', self.items)
        ]);

        self.goToItemType = function(itemType) {
            window.console&&console.log("itemType: " + itemType.name);
            self.lastItemType(itemType.name);
            itemType.query();
        };

        // default query to view
        self.goToItemType(self.itemTypes()[0]);

        // behaviour
        self.navigateNewItem = function() {
            router.navigate('my-items/new-item');
        };

        // load data
        var api_url = "../../api/"
        jsonHelper.getItems(api_url + "items_my", self.items);

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };


    return new ViewModel();
});
