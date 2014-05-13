define([
    'knockout'
    , 'utils/holder'
    , 'dao/api'
],
function(
    ko
    , holder
    , api
) {
    var ctor = function() {};

    ctor.prototype.activate = function(settings) {
        var self = this;
        self.settings = settings;
        self.profile = ko.observable();

        // load data
        api.profileGET(self.profile);
    };

    ctor.prototype.compositionComplete = holder.compositionComplete;

    return ctor;
});
