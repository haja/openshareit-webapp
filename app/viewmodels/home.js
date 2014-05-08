define([
    'knockout'
    , 'durandal/app'
    , 'jquery'
    , 'underscore'
    , 'ko-bindings/google-maps-binding'
    , 'utils/holder'
    , 'models/GMap'
    , 'utils/json-helper'
    , 'dialogs/QueryItemDialog'
    , 'utils/geolocation'
    , 'dao/api'
],
function(
    ko
    , app
    , $
    , _
    , gmaps_binding
    , holder
    , GMap
    , jsonHelper
    , QueryItemDialog
    , geolocation
    , api
) {
    var QueryTypeImpl = function(name, view, resultProperty) {
        var self = this;
        self.name = name;

        // location if geolocation is not available
        var DEFAULT_POSITION = {
            // Vienna
            latitude: 48.12
            , longitude: 16.22
        };

        self.query = function() {
            var loadMapitems = function(position) {
                api.mapitemsGET(position, view, resultProperty, holder.compositionComplete);
            };

            loadMapitems(DEFAULT_POSITION);

            // update data when geolocation becomes available
            geolocation.getLocation(
                loadMapitems,
                function(error) {
                    window.console && console.log("error in getLocation:", error);
                }
            );
        };
    };

    function ItemsViewModel() {
        var self = this;


        var loadItemAsync = function(item) {
            window.console && console.log("loading itemId: " + item.id);
            // load data async if not already loaded
            var loadedItem = self.loadedItemsFull()[item.id];
            if(typeof(loadedItem) === 'undefined') {
                api.itemGET(item.id
                    , function(fullItem) {
                        var itemsHashMap = self.loadedItemsFull();
                        item.setData(fullItem);
                        itemsHashMap[item.id] = item;
                        //self.loadedItemsFull(itemsHashMap); // not needed?
                        item.isLoaded(true);
                        window.console && console.log("loaded item:", item);
                    }
                    , holder.compositionComplete());
            }
        };

        /**
        * only one item can be active
        */
        self.setActive = function(item, state) {
            self.setActiveMultiple([item], state);
        };

        self.setActiveMultiple = function(items, state) {
            window.console && console.log("setActiveMultiple:", items);
            state = typeof state !== 'undefined' ? state : true; //state defaults to true

            _.each(items, loadItemAsync);

            // deactivate all other items and activate matching items
            _.each(self.items(), function(item) {
                if(_.contains(items, item)) {
                    // matching item, set state
                    if(item.active() !== state) {
                        item.active(state);
                    }
                } else {
                    item.active(false);
                }
            });

            // TODO scroll to the topmost active item; is this possible easily? (async loading of full items...)
            /*
            var $topItem;
            var topOffset = $(document).height();
            _.each(items, function(item) {
                var $item = $('#item_' + item.id);
                var itemOffset = $item.offset().top;
                if(itemOffset < topOffset) {
                    topOffset = itemOffset;
                    $topItem = $item;
                }
            });
            $(document).scrollTop($topItem.scrollTop());
            */

            holder.compositionComplete();
        };

        self.toggleActive = function(item) {
            window.console && console.log("toggleActive:", item, item.active());
            self.setActive(item, !item.active());
        };

        //data
        self.loadedItemsFull = ko.observable({});
        self.mapitems = ko.observableArray([]);
        self.items = ko.computed(function() {
            var itemsComputed = _.reduceRight(self.mapitems(), function(a, b) {
                return { items: a.items.concat(b.items) };
            }, { items: [] }).items;

            // replace already loaded items
            _.each(itemsComputed, function(elem, idx, list) {
                var fullItem = self.loadedItemsFull()[elem.id];
                if(typeof(fullItem) !== 'undefined') {
                    list[idx] = fullItem;
                }
            });

            window.console && console.log("ItemsViewModel: items: computed again:", itemsComputed);
            holder.compositionComplete();
            return itemsComputed;
        });
        self.map = ko.observable(new GMap(self.mapitems, self.setActiveMultiple));

        /** open a modal dialog to query an item */
        self.showQueryItemDialog = function(item) {
            QueryItemDialog.show(item).then(function(response) {
                if(typeof response !== 'undefined') {
                    app.showMessage('Dialog closed; response: ' + response);
                }
            });
        };
        self.actions = {
            showQueryItemDialog: self.showQueryItemDialog
            , setActive: self.setActive
            , toggleActive: self.toggleActive
        };

        self.queryTypes = ko.observableArray([
            new QueryTypeImpl('Nähe', 'near', self.mapitems)
            , new QueryTypeImpl('Aktualität', 'fresh', self.mapitems)
            , new QueryTypeImpl('Abholdatum', 'pick_up', self.mapitems)
        ]);

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };

    return new ItemsViewModel();
});
