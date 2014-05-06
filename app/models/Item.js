define(['knockout', 'models/User'], function(ko, User) {
    var Ctor = function Item(item) {
        var self = this;
        self.id = item.id;
        self.name = item.name;
        self.loc = item.location;
        self.description = item.description;
        self.user = new User(item.user);

        // requests
        self.requests = ko.observableArray();

        // UI behavior
        self.maxDescriptionLength = 12;
        self.getShortDescription = ko.computed(function() {
            if(self.description.length > self.maxDescriptionLength) {
                return self.description.slice(0, self.maxDescriptionLength) + " ...";
            }
            return self.description;
        });
        self.active = ko.observable(false);
        self.toggleActive = function() {
            self.active(!self.active());
        };
        self.setActive = function(b) {
            self.active(b);
        };


        // helper functions
        self.setData = function(other) {
            self.id = other.id;
            self.name = other.name;
            self.loc = other.loc;
            self.description = other.description;
            self.user = other.user;
            self.requests(other.requests());
            self.maxDescriptionLength = other.maxDescriptionLength;
            self.active(other.active());
        };
    };

    return Ctor;
});
