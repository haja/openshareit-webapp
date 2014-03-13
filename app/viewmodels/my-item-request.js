define([
    'knockout'
    , 'holderjs'
    , 'utils/json-helper'
    , 'utils/QueryType'
    , 'dialogs/UserDetailsDialog'
    , 'plugins/router'
],
function(
    ko
    , holder
    , jsonHelper
    , QueryType
    , UserDetailsDialog
    , router
) {
    var log = function(msg) { window.console && console.log(msg); };
    var ViewModel = function() {
        var self = this;
        self.activeItem = ko.observable();
        self.activeRequest = ko.observable();

        var api_url = "../../api/"

        self.showUserDialog = function(request) {
            window.console && console.log("showUserDialog: ", request);
            UserDetailsDialog.show(request.from);
        };

        self.uiSetActive = function(request) {
            // request should be from active item
            var itemId = self.activeItem().id;
            var reqId = request.id;
            var newHash = '#my-item/' + itemId + '/request/' + reqId

            self.setActive(itemId, reqId);
            router.navigate(newHash, false); // update only hash
        };

        self.setActive = function(itemId, requestId) {
            itemId = parseInt(itemId);
            requestId = parseInt(requestId);
            jsonHelper.getItem(api_url + "item_" + itemId, self.activeItem, function() {
                jsonHelper.getRequestsForSingleItem(api_url + "request/", self.activeItem, function() {
                    self.activeRequest(_.find(self.activeItem().requests(), function(req) {
                        return req.id === requestId;
                    })
                    );
                    holder.run();
                });
            });
        };

        self.activate = function(itemId, requestId) {
            self.setActive(itemId, requestId);
        };

        self.isActiveRequest = function(req) {
            return typeof(self.activeRequest()) !== 'undefined' && req.id === self.activeRequest().id;
        };

        // load holderjs images
        self.compositionComplete = holder.run;
    };


    return new ViewModel();
});
