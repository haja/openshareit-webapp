define([
    'knockout'
    , 'underscore'
    , 'holderjs'
    , 'utils/json-helper'
    , 'utils/QueryType'
    , 'dialogs/UserDetailsDialog'
    , 'plugins/router'
],
function(
    ko
    , _
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

        var api_url = "../../api/"

        self.uiSetActive = function(request) {
            window.console && console.log("uiSetActive", request);
            request.active(true);
            // still useful?
            // request should be from active item
            //var itemId = self.activeItem().id;
            //var newHash = '#my-item/' + itemId + '/request/' + request.id;
            //router.navigate(newHash, false); // update only hash
        };

        self.setActiveRequest = function(reqId) {
            window.console && console.log("setActiveRequest", reqId);
            var activeRequest = _.find(self.activeItem().requests(), function(req) {
                return req.id === reqId;
            });
            self.uiSetActive(activeRequest);
            holder.run();
        };

        self.setActive = function(itemId, requestId) {
            window.console && console.log("setActive", requestId);
            itemId = parseInt(itemId);
            requestId = parseInt(requestId);
            jsonHelper.getItem(api_url + "item_" + itemId, self.activeItem, function() {
                jsonHelper.getRequestsForSingleItem(api_url + "request/", self.activeItem, function() {
                    self.setActiveRequest(requestId);
                });
            });
        };

        self.activate = function(itemId, requestId) {
            self.setActive(itemId, requestId);
        };

        // load holderjs images
        self.compositionComplete = holder.run;
    };


    return new ViewModel();
});
