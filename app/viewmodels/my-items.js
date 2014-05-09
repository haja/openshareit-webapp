define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'plugins/router'
    , 'dialogs/CreateAddressDialog'
    , 'utils/QueryType'
    , 'dialogs/UserDetailsDialog'
],
function(
    ko
    , holder
    , jsonHelper
    , router
    , CreateAddressDialog
    , QueryType
    , UserDetailsDialog
) {
    var log = function(msg) { window.console && console.log(msg); };
    var ViewModel = function() {
        var self = this;

        // data
        self.items = ko.observableArray();
        self.statusMessages = {};

        var api_url = "../../api/"
        self.queryTypes = ko.observableArray([
            new QueryType('Meine Artikel', 'items_my',
                function(items) {
                    self.items(items);
                    jsonHelper.getRequestsForItems(api_url + "request/", self.items,
                        function() {
                            window.console && console.log("my-items: queryChanged: got requests!");
                            if(self.requestToActivate) {
                                window.console && console.log("my-items: queryChanged: got item & request:", self.requestToActivate);
                                var item, request;
                                item = _.find(self.items(), function(it) {
                                    window.console && console.log("my-items: finding active item:", it);
                                    return it.id === parseInt(self.requestToActivate.itemId);
                                });
                                window.console && console.log("my-items: found active item:", item);
                                if(item) {
                                    request = _.find(item.requests(), function(req) {
                                        return req.id === parseInt(self.requestToActivate.requestId);
                                    });
                                    window.console && console.log("my-items: found active item/request:", item, request);
                                    request.active(true);
                                    //self.requestToActivate = false;
                                }
                            }
                        });
                }
            )
            , new QueryType('Angefragte Artikel', 'items_queried', self.items)
            , new QueryType('Abgeholte Artikel', 'items_picked_up', self.items)
        ]);

        self.showUserDialog = function(request) {
            window.console && console.log("showUserDialog: ", request);
            UserDetailsDialog.show(request.from);
        };

        self.actions = {
            showUserDialog: self.showUserDialog
        };

        self.activate = function(params) {
            if(params && params.item && params.request) {
                window.console && console.log("my-items: activate: got item & request:", params);
                self.requestToActivate = {
                    itemId: params.item
                    , requestId: params.request
                };
            }

            self.statusMessages.itemCreated = ko.observable(false);
            if(params && params.itemCreated === 'true') {
                window.console && console.log("my-items: activate: itemCreated");
                self.statusMessages.itemCreated(true);
                // remove param from history
                router.navigate('#my-items', { replace: true, trigger: false });
            }
        };

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };


    return new ViewModel();
});
