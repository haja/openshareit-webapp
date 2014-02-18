define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
],
function(
    ko
    , holder
    , jsonHelper
) {
    var ViewModel = function() {
        var self = this;

        // data
        self.items = ko.observableArray([]);

        // load data
        var api_url = "../../api/"
        jsonHelper.getItems(api_url + "items_my", self.items);

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };


    return new ViewModel();
});
