define([
    'knockout'
    , 'moment'
    ], function(
        ko
        , moment
    ) {
        var Ctor = function Profile(data) {
            var self = this;

            self.firstName = data.firstName;
            self.lastName = data.lastName;
            self.email = data.email;
            self.dateJoined = moment(data.dateJoined, 'YYYY-MM-DD-HH:mm:ss-');// date format: yyyy-mm-ddThh:mm:ssZ

            self.getDateJoinedAsString = function() {
                return self.dateJoined.format('DD.MM.YYYY');
            };

        };
        return Ctor;
    }
);
