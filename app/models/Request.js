define([
    'knockout'
    , 'models/User'
]
, function(
    ko
    , User
) {
    var Ctor = function Request(req) {
        var self = this;
        self.id = req.id;
        self.from = new User(req.from);
    };

    return Ctor;
});
