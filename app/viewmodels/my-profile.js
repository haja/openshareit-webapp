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
    var ViewModel = function() {
        var self = this;

        // data
        self.items = ko.observableArray([]);
        self.addresses = ko.observableArray([]);

        // behaviour
        self.navigateNewItem = function() {
            router.navigate('my-items/new-item');
        };
        self.showCreateAddressDialog = function() {
            window.console && console.log("showCreateAddressDialog");
            CreateAddressDialog.show().then(function(response) {
                if(typeof response !== 'undefined') {
                    self.addresses.push(response);
                }
            });
        }

        // load data
        var api_url = "../../api/"
        jsonHelper.getItems(api_url + "items_my", self.items);
        jsonHelper.getAddresses(api_url + "addresses_my", self.addresses);

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };


    return new ViewModel();
});
