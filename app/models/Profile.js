define([
    'knockout'
    , 'moment'
    ], function(
        ko
        , moment
    ) {
        var Ctor = function Profile(data) {
            var self = this;

            self.first_name = data.first_name;
            self.last_name = data.last_name;
            self.email = data.email;
            self.dateJoined = moment(data.dateJoined, 'YYYY-MM-DD-HH:mm:ss-');// date format: yyyy-mm-ddThh:mm:ssZ

            self.getDateJoinedAsString = function() {
                return self.dateJoined.format('DD.MM.YYYY');
            };

        };
        return Ctor;
    }
);
