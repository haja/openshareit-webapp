define(['knockout'], function(ko) {
    var Ctor = function Profile(data) {
        var self = this;

        self.firstName = data.firstName;
        self.lastName = data.lastName;
        self.email = data.email;
        self.dateJoined = function() {
            // date format: yyyy-mm-ddThh:mm:ssZ
            var parts = data.dateJoined.split('-');
            var timeParts = parts[2]
            .slice(1) // ignore 'T'
            .split(':');
            return new Date(parts[0]
                , parts[1] - 1 // months are 0-based
                , parts[2].slice(0,2
                , timeParts[0]
                , timeParts[1]
                , timeParts[2].slice(0,2)
                ));
        }();
        self.getDateJoinedAsString = function() {
            window.console && console.log(self.dateJoined);
            var d = self.dateJoined;
            return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('.');
        };

    };
    return Ctor;
});
