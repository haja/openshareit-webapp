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

            self.first_name = data.first_name;
            self.last_name = data.last_name;
            self.email = data.email;
            self.dateJoined = moment(data.date_joined, api_dateformat.momentParseFormat);

            self.getDateJoinedAsString = function() {
                return self.dateJoined.format('DD.MM.YYYY');
            };

        };
        return Ctor;
    }
);
