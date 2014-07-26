/*
 * my items; Show all items this user has created or requested.
 */
define([
    'knockout'
    , 'utils/holder'
    , 'plugins/router'
    , 'dialogs/CreateAddressDialog'
    , 'dialogs/UserDetailsDialog'
    , 'dao/api'
],
function(
    ko
    , holder
    , router
    , CreateAddressDialog
    , UserDetailsDialog
    , api
) {
    /*
     * shorthand for logging messages to console
     */
    var log = function(msg) { window.console && console.log(msg); };

    var ViewModel = function() {
        var self = this;

        //
        // data
        //

        self.items = ko.observableArray();
        /*
         * display information about successfully created items and other messages
         */
        self.statusMessages = {};

        // TODO remove this
        var api_url = "../../api/"

        /*
         * Available query types
         */
        self.queryTypes = ko.observableArray([
            {
                name: 'Meine Artikel'
                , query: function() {
                    // TODO implment
                    api.itemsGETwithRequests('myitems', self.items,
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
            }
            , {
                name: 'Angefragte Artikel'
                , query: _.partial(api.itemsGETwithRequests, 'reqitems', self.items)
            }
            , {
                name: 'Abgeholte Artikel'
                , query: _.partial(api.itemsGETwithRequests, 'fetcheditems', self.items)
            }
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
            self.statusMessages.itemUpdated = ko.observable(false);
            if(params && params.itemUpdated === 'true') {
                window.console && console.log("my-items: activate: itemUpdated");
                self.statusMessages.itemUpdated(true);
                // remove param from history
                router.navigate('#my-items', { replace: true, trigger: false });
            }
        };

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };


    return new ViewModel();
});
