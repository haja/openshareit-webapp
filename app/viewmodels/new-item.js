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
                    self.choosenAddress(self.item().loc.id); // TODO FIXME
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
