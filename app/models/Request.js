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
        self.from = new User(req.from);
        self.messages = req.messages;
    };

    return Ctor;
});
