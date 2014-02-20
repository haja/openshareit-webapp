define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'plugins/router'
],
function(
    ko
    , holder
    , jsonHelper
    , router
) {
    var ViewModel = function() {
        var self = this;

        // data
        self.items = ko.observableArray([]);
        self.addresses = ko.observableArray([]);
        self.profile = ko.observable();

        // behaviour
        self.navigateNewItem = function() {
            router.navigate('my-items/new-item');
        };

        // load data
        var api_url = "../../api/"
        jsonHelper.getItems(api_url + "items_my", self.items);
        jsonHelper.getAddresses(api_url + "addresses_my", self.addresses);
        jsonHelper.getProfile(api_url + "profile_my", self.profile);

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };


    return new ViewModel();
});
