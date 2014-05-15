// *
// create a new item or edit an existing item (if itemId is passed on activation)
// */
define([
    'knockout'
    , 'utils/holder'
    , 'plugins/router'
    , 'bootstrap-datepicker'
    , 'jquery'
    , 'moment'
    , 'dialogs/CreateAddressDialog'
    , 'dao/api'
    , 'underscore'
],
function(
    ko
    , holder
    , router
    , datepicker
    , $
    , moment
    , CreateAddressDialog
    , api
    , _
) {
    var ViewModel = function() {
        var self = this;

        // data
        self.title = ko.observable();
        self.addresses = ko.observableArray([]);
        self.choosenAddress = ko.observable(-1);
        self.item = ko.observable({});
        var dateformat = {
            'moment': 'DD.MM.YYYY'
            , 'datepicker': 'dd.mm.yyyy'
            , 'api': 'YYYY-MM-DDTHH:mm'
        };
        self.pickupDate = ko.observable(moment().add('d', 1).format(dateformat.moment));

        // behaviour
        self.showCreateAddressDialog = function() {
            window.console && console.log("showCreateAddressDialog");
            CreateAddressDialog.show().then(function(response) {
                if(typeof response !== 'undefined') {
                    self.addresses.push(response);
                }
            });
        };

        self.getChoosenAddress = function() {
            var choosenAddr = parseInt(self.choosenAddress());
            var addr = _.find(self.addresses(), function(address) {
                return address.id === choosenAddr;
            });
            if(typeof(addr) === 'undefined') {
                return {
                    street: ''
                    , houseNumber: ''
                };
            } else {
                return addr;
            }
        };

        self.submitNewItem = function(form) {
            var jqxhr;
            var item = self.item();
            window.console && console.log("submitNewItem", form, item);

            // somewhat validate data
            if(item
                && typeof(item.name) === 'string'
                && typeof(item.description) === 'string'
                && item.name !== ''
                && item.description !== ''
            ) {
                item.location = self.choosenAddress();
                item.pickupDeadline = moment(self.pickupDate(), dateformat.moment).format(dateformat.api);

                item.status = 'READY'; // TODO is this correct? should serer handle this?

                window.console && console.log("submitting item", item);
                jqxhr = api.itemsPOST(item);
                jqxhr.done(function(data) {
                    window.console && console.log("itemsPOST: respones", data);
                    // redirect to myItems and show success message
                    router.navigate('#my-items?itemCreated=true', { replace: true, trigger: true });
                });
                jqxhr.fail(function(data) {
                    window.console && console.log("itemsPOST: failed", data);
                    // TODO display error message
                });
            } else {
                window.console && console.log("trying to submit invalid item, aborting", item);
            }
        };

        self.activate = function(itemId) {
            // load data
            var api_url = "../../api/";
            api.addressesGET(function(addresses) {
                self.addresses(addresses);
                if(typeof(itemId) === 'undefined') {
                    // TODO get default address from api
                    // TODO handle case if no address is available
                    self.choosenAddress(self.addresses()[0].id);
                }
            });

            if(typeof(itemId) !== 'undefined') {
                self.title('Artikel bearbeiten');
                // load item data
                api.itemGET(itemId, self.item, function() {
                    window.console && console.log("item loaded", self.item());
                    self.choosenAddress(self.item().loc().id);
                });
            } else {
                self.title('Artikel anlegen');
            };
        };

        // load holderjs images and datepicker
        self.compositionComplete = function() {
            $('.datepicker').datepicker({
                format: dateformat.datepicker
                , autoclose: true
            });
            holder.compositionComplete();
        };
    };

    return ViewModel;
});
