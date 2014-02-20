define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
    , 'plugins/router'
    , 'bootstrap-datepicker'
    , 'jquery'
    , 'moment'
],
function(
    ko
    , holder
    , jsonHelper
    , router
    , datepicker
    , $
    , moment
) {
    var ViewModel = function() {
        var self = this;

        // data
        self.addresses = ko.observableArray([]);
        var dateformat = {
            'moment': 'DD.MM.YYYY'
            , 'datepicker': 'dd.mm.yyyy'
        };
        self.pickupDate = ko.observable(moment().format(dateformat.moment));

        // load data
        var api_url = "../../api/";
        jsonHelper.getAddresses(api_url + "addresses_my", self.addresses);

        // load holderjs images and datepicker
        self.compositionComplete = function() {
            $('.datepicker').datepicker({
                format: dateformat.datepicker
                , autoclose: true
            });
            holder.compositionComplete;
        };
    };


    return new ViewModel();
});
