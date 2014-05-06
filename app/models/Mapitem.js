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
            if(typeof(it.description) === 'undefined') {
                it.description = '';
            }
            return new Item(it);
        });
        self.coordinates = mapitem.coordinates;
    };

    return Ctor;
});
