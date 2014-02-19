define(['knockout'], function(ko) {
    var Ctor = function Address(loc) {
        var self = this;
        self.id = loc.id;
        self.province = loc.province;
        self.city = loc.city;
        self.country = loc.country;
        self.coordinates = loc.coordinates;
        self.street = loc.street;
        self.postalCode = loc.postalCode;
        self.houseNumber = loc.houseNumber;
    };
    return Ctor;
});
