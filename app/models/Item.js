define(['knockout'], function(ko) {
    var Ctor = function Item(id, name, loc, descr) {
        var self = this;
        self.id = id;
        self.name = name;
        self.loc = loc;
        self.description = descr;
        self.active = ko.observable(false);
        self.toggleActive = function() {
            self.active(!self.active());
        };
    };

    return Ctor;
});
