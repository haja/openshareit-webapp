define([
    'knockout'
    , 'underscore'
    ], function(
        ko
        , _
    ) {
        var Ctor = function GMap(items, setActiveCallback) {
            var self = this;
            self.items = items;
            self.data = {};
            self.asLocations = ko.computed(function() {
                window.console&&console.log("computed again");
                return ko.utils.arrayMap(self.items(), function(item) {
                    var loc = item.loc.coordinates;
                    return { latitude: loc.latitude
                        , longitude: loc.longitude
                        , id: item.id
                        , active: item.active()
                        , setActive: _.partial(setActiveCallback, item)
                        , setInactive: _.partial(setActiveCallback, item, false)
                    };
                });
            }, self);
        };
        return Ctor;
    }
);
