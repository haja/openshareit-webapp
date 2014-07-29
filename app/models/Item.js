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

            if(typeof(item) === 'undefined') {
                item = {
                    'location': {}
                    , 'user': {}
                    , 'description': ''
                }
            }

            self.id = ko.observable(item.id);
            self.name = ko.observable(item.name);
            self.loc = ko.observable(new Address(item.location));
            self.description = ko.observable(item.description);
            self.user = ko.observable(new User(item.user));
            self.pickupDeadline = ko.observable(moment(item.pickupDeadline, api_dateformat.momentParseFormat));
            self.status = ko.observable(item.status);

            // requests
            self.requests = ko.observableArray();

            // UI behavior
            self.maxDescriptionLength = 12;
            self.getShortDescription = ko.computed(function() {
                if(self.description().length > self.maxDescriptionLength) {
                    return self.description().slice(0, self.maxDescriptionLength) + " ...";
                }
                return self.description();
            });

            self.getPickupDeadlineAsString = function() {
                return self.pickupDeadline().format('DD.MM.YYYY');
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
                self.id(other.id);
                self.name(other.name);
                self.loc(other.loc);
                self.description(other.description);
                self.user(other.user);
                self.requests(other.requests());
                self.maxDescriptionLength = other.maxDescriptionLength;
                self.pickupDeadline(other.pickupDeadline);
                self.status(other.status);
            };
            self.setDataFromItem = function(other) {
                self.id(other.id());
                self.name(other.name());
                self.loc(other.loc());
                self.description(other.description());
                self.user(other.user());
                self.requests(other.requests());
                self.maxDescriptionLength = other.maxDescriptionLength;
                self.pickupDeadline(other.pickupDeadline());
                self.status(other.status());
            };

            self.getPlainObject = function() {
                var plain = {};
                plain.id = self.id();
                plain.name = self.name();
                plain.loc = self.loc();
                plain.description = self.description();
                plain.user = self.user();
                plain.pickupDeadline = self.pickupDeadline();
                plain.requests = self.requests();
                plain.status = self.status();
                return plain;
            };
        };

        return Ctor;
    }
);
