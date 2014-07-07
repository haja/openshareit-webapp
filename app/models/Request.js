define([
    'knockout'
    , 'underscore'
    , 'models/User'
]
, function(
    ko
    , _
    , User
) {
    var Ctor = function Request(req) {
        var self = this;
        self.id = req.id;
        self.from = new User(req.user);
        self.approved = ko.observable(req.approved);
        self.messages = ko.observableArray();
        self.active = ko.observable(false);
        self.isLoading = ko.observable(false);
    };

    return Ctor;
});
