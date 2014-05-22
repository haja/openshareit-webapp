define([
    'knockout'
    , 'plugins/router'
    , 'dialogs/CreateAddressDialog'
    , 'dao/api'
],
function(
    ko
    , router
    , CreateAddressDialog
    , api
) {
    var ViewModel = function() {
        var self = this;

        // data
        self.addresses = ko.observableArray([]);
        self.defaultAddressId = ko.observable(-1);
        self.editAddresses = ko.observable(false);

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
        };
        self.toggleEditAddresses = function() {
            self.editAddresses(!self.editAddresses());
        };
        self.deleteAddress = function(address) {
            window.console && console.log("deleting address", address);
        };

        // load data
        api.addressesGET(self.addresses);
        /* TODO enable if api handles /users/ correctly
        api.defaultAddressGET(function(addr) {
            self.defaultAddressId(addr.id);
        });
        */
    };


    return new ViewModel();
});
