define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'plugins/router'
    , 'dialogs/CreateAddressDialog'
    , 'utils/QueryType'
],
function(
    ko
    , holder
    , jsonHelper
    , router
    , CreateAddressDialog
    , QueryType
) {
    var log = function(msg) { window.console && console.log(msg); };
    var ViewModel = function() {
        var self = this;

        // data
        self.items = ko.observableArray();

        var api_url = "../../api/"
        self.queryTypes = ko.observableArray([
            new QueryType('Meine Artikel', 'items_my',
            function(items) {
                self.items(items);
                jsonHelper.getRequestsForItems(api_url + "request/", self.items)
            }
            )
            , new QueryType('Angefragte Artikel', 'items_queried', self.items)
            , new QueryType('Abgeholte Artikel', 'items_picked_up', self.items)
        ]);

        self.actions = {};

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };


    return new ViewModel();
});
