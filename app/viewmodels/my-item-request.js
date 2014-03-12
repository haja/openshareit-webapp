define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'utils/QueryType'
    , 'dialogs/UserDetailsDialog'
],
function(
    ko
    , holder
    , jsonHelper
    , QueryType
    , UserDetailsDialog
) {
    var log = function(msg) { window.console && console.log(msg); };
    var ViewModel = function() {
        var self = this;
        self.activeItem = ko.observable();

        var api_url = "../../api/"

        self.showUserDialog = function(request) {
            window.console && console.log("showUserDialog: ", request);
            UserDetailsDialog.show(request.from);
        };


        self.activate = function(itemId, requestId) {
            jsonHelper.getItem(api_url + "item_" + itemId, self.activeItem, function() {
                jsonHelper.getRequestsForSingleItem(api_url + "request/", self.activeItem);
            });
        };

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };


    return new ViewModel();
});
