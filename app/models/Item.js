define([
    'knockout'
    , 'models/User'
    , 'models/Address'
    , 'dao/api-dateformat'
    , 'moment'
    ], function(
        ko
        , User
        , Address
        , api_dateformat
        , moment
    ) {
        var Ctor = function Item(item) {
            var self = this;
            self.id = item.id;
            self.name = item.name;
            self.loc = new Address(item.location);
            self.description = item.description;
            self.user = new User(item.user);
            self.pickupDeadline = moment(item.pickupDeadline, api_dateformat.momentParseFormat);

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

            self.getPickupDeadlineAsString = function() {
                return self.pickupDeadline.format('DD.MM.YYYY');
            };

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
                self.pickupDeadline = other.pickupDeadline;
            };
        };

        return Ctor;
    }
);
