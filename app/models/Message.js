define([
    'knockout'
    , 'underscore'
    , 'models/User'
    , 'dao/api-dateformat'
    , 'moment'
]
, function(
    ko
    , _
    , User
    , api_dateformat
    , moment
) {
    var Ctor = function Message(data) {
        var self = this;
        self.id = data.id;
        self.from = new User(data.sender);
        self.message = data.message;
        self.sendDate = ko.observable(moment(data.sendDate, api_dateformat.momentParseFormat));
    };

    return Ctor;
});
