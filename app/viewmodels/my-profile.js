/*
 * my profile; Show all data of the currently logged in user.
 */
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

        //
        // data
        //

        /*
         * addresses of the user
         */
        self.addresses = ko.observableArray([]);
        /*
         * id of the default adress
         */
        self.defaultAddressId = ko.observable(-1);
        /*
         * If true, we are in address edit mode
         */
        self.editAddresses = ko.observable(false);

        //
        // behaviour
        //

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
