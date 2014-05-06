define([
    'knockout'
    , 'underscore'
    ], function(
        ko
        , _
    ) {
        var Ctor = function GMap(mapitems, setActiveCallback) {
            var self = this;
            self.mapitems = mapitems;
            self.data = {};
            self.asLocations = ko.computed(function() {
                window.console&&console.log("computed again");
                return ko.utils.arrayMap(self.mapitems(), function(mapitem) {
                    var loc = mapitem.coordinates;
                    return { latitude: loc.latitude
                        , longitude: loc.longitude
                        , id: mapitem.items[0].id // one item must be present, use this id for this mapitem
                        , active: _.reduce(mapitem.items, function(memo, item) {
                            return memo || item.active();
                        }, false)
                        , setActive: _.partial(setActiveCallback, mapitem.items, true)
                        , setInactive: _.partial(setActiveCallback, mapitem.items, false)
                    };
                });
            }, self);
        };
        return Ctor;
    }
);
