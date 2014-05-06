define([
    'knockout'
    , 'underscore'
    , 'models/Item'
]
, function(
    ko
    , _
    , Item
) {
    var Ctor = function Mapitem(mapitem) {
        var self = this;
        self.items = _.map(mapitem.items, function(it) {
            var newIt;
            if(typeof(it.description) === 'undefined') {
                it.description = '';
            }
            newIt = new Item(it);
            newIt.isLoaded = ko.observable(false);
            return newIt;
        });
        self.coordinates = mapitem.coordinates;
    };

    return Ctor;
});
