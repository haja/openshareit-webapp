define([
    'knockout'
    , 'utils/holder'
    , 'utils/json-helper'
],
function(
    ko
    , holder
    , jsonHelper
) {
    var ctor = function() {};

    ctor.prototype.activate = function(settings) {
        var self = this;
        self.settings = settings;
        self.profile = ko.observable();

        // load data
        var api_url = "../../api/"
        jsonHelper.getProfile(api_url + "profile_my", self.profile);
    };

    ctor.prototype.compositionComplete = holder.compositionComplete;

    return ctor;
});
