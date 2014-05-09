// *
// create a new item or edit an existing item (if itemId is passed on activation)
// */
define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'plugins/router'
    , 'bootstrap-datepicker'
    , 'jquery'
    , 'moment'
    , 'dialogs/CreateAddressDialog'
    , 'dao/api'
],
function(
    ko
    , holder
    , jsonHelper
    , router
    , datepicker
    , $
    , moment
    , CreateAddressDialog
    , api
) {
    var ViewModel = function() {
        var self = this;

        // data
        self.title = ko.observable();
        self.addresses = ko.observableArray([]);
        self.choosenAddress = ko.observable();
        self.item = ko.observable({});
        var dateformat = {
            'moment': 'DD.MM.YYYY'
            , 'datepicker': 'dd.mm.yyyy'
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
        }

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
                item.pickupDeadline = self.pickupDate();

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
            // TODO set default address
            jsonHelper.getAddresses(api_url + "addresses_my", self.addresses, function() {
                if(typeof(itemId) === 'undefined') {
                    self.choosenAddress(self.addresses()[0].id);
                }
            });

            if(typeof(itemId) !== 'undefined') {
                self.title('Artikel bearbeiten');
                // load item data
                jsonHelper.getItem(api_url + 'item_' + itemId, self.item, function() {
                    window.console && console.log("item loaded:");
                    window.console && console.log(self.item());
                    self.choosenAddress(self.item().loc.id);
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


    return new ViewModel();
});
