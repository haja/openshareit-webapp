define(['knockout'], function(ko) {
    var Ctor = function Item(item) {
        var self = this;
        self.id = item.id;
        self.name = item.name;
        self.loc = item.location;
        self.description = item.description;
        self.active = ko.observable(false);
        self.toggleActive = function() {
            self.active(!self.active());
        };
    };

    return Ctor;
});
