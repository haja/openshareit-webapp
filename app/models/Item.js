define(['knockout', 'models/User'], function(ko, User) {
    var Ctor = function Item(item) {
        var self = this;
        self.id = item.id;
        self.name = item.name;
        self.loc = item.location;
        self.description = item.description;
        self.user = new User(item.user);

        // UI behavior
        self.active = ko.observable(false);
        self.toggleActive = function() {
            self.active(!self.active());
        };
        self.setActive = function(b) {
            self.active(b);
        };
    };

    return Ctor;
});
