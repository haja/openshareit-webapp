define([
    'knockout'
    , 'moment'
    , 'dao/api-dateformat'
    ], function(
        ko
        , moment
        , api_dateformat
    ) {
        var Ctor = function Profile(data) {
            var self = this;

            self.id = ko.observable(data.id);
            self.first_name = ko.observable(data.first_name);
            self.last_name = ko.observable(data.last_name);
            self.email = ko.observable(data.email);
            self.dateJoined = ko.observable(moment(data.date_joined, api_dateformat.momentParseFormat));
            self.phoneNumber = ko.observable(data.phoneNumber);

            self.getDateJoinedAsString = function() {
                return self.dateJoined().format('DD.MM.YYYY');
            };

            self.getPlainObject = function() {
                var plain = {};
                plain.id = self.id();
                plain.first_name = self.first_name();
                plain.last_name = self.last_name();
                plain.email = self.email();
                plain.dateJoined = self.dateJoined();
                plain.phoneNumber = self.phoneNumber();
                return plain;
            };

        };
        return Ctor;
    }
);
