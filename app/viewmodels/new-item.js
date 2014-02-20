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
        self.addresses = ko.observableArray([]);
        self.choosenAddress = ko.observable();
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

        // load data
        var api_url = "../../api/";
        // TODO set default address
        jsonHelper.getAddresses(api_url + "addresses_my", self.addresses, function() {
            self.choosenAddress(self.addresses()[0]);
        });

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
