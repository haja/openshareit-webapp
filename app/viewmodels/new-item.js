define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'plugins/router'
    , 'bootstrap-datepicker'
    , 'jquery'
],
function(
    ko
    , holder
    , jsonHelper
    , router
    , datepicker
    , $
) {
    var ViewModel = function() {
        var self = this;

        // data
        self.addresses = ko.observableArray([]);
        self.pickupDate = ko.observable();

        // load data
        var api_url = "../../api/"
        jsonHelper.getAddresses(api_url + "addresses_my", self.addresses);

        // load holderjs images
        self.compositionComplete = function() {
            // $('.datepicker').datepicker();
            holder.compositionComplete;
        };
    };


    return new ViewModel();
});
