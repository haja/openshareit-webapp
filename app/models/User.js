define([
    'knockout'
    ], function(
        ko
    ) {
        var Ctor = function User(data) {
            var self = this;
            if(typeof(data) === 'string') {
                self.firstName = data;
            } else {
                self.id = data.id;
                self.firstName = data.firstName;
                self.lastName = data.lastName;
                self.email = data.email;
                self.phoneNumber = data.phoneNumber;
                self.mobileNumber = data.mobileNumber;
                self.isAdmin = data.isAdmin;
            }

            self.getFullName = ko.computed(function() {
                return self.firstName + ' ' + self.lastName;
            });
        };

        return Ctor;
    }
);
