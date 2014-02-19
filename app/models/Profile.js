define(['knockout'], function(ko) {
    var Ctor = function Profile(data) {
        var self = this;

        self.firstName = data.firstName;
        self.lastName = data.lastName;
        self.email = data.email;
        self.dateJoined = data.dateJoined;
    };
    return Ctor;
});
