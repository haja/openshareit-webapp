define([
    'knockout'
    , 'utils/holder'
    , 'plugins/router'
    , 'dialogs/CreateAddressDialog'
    , 'dao/api'
],
function(
    ko
    , holder
    , router
    , CreateAddressDialog
    , api
) {
    var ViewModel = function() {
        var self = this;

        // data
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
        api.addressesGET(self.addresses);

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };


    return new ViewModel();
});
