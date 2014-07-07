/*
 * home screen; This screen displays a map and a list of nearby items.
 */
define([
    'knockout'
    , 'durandal/app'
    , 'jquery'
    , 'underscore'
    , 'ko-bindings/google-maps-binding'
    , 'models/GMap'
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
    , GMap
    , QueryItemDialog
    , geolocation
    , api
) {

    /*
     * This class holds data for one type of query. Each query type is called with different data (such as ordering or view).
     */
    var QueryTypeImpl = function(name, view, resultProperty) {
        var self = this;
        self.name = name;

        /*
         * location if geolocation is not available
         */
        var DEFAULT_POSITION = {
            // Vienna
            // http://api.ionic.at/mapitems/?longitude=&latitude=16.3718631&distance=0.0001&limit=100
            latitude: 48.2071545
            , longitude: 16.3718631
        };


        /*
         * actual query to be called when a query type is selected.
         */
        self.query = function() {
            var loadMapitems = function(position) {
                api.mapitemsGET(position, view, resultProperty);
            };

            loadMapitems(DEFAULT_POSITION);

            /*
             * update data when geolocation becomes available
             */
            geolocation.getLocationCached(
                loadMapitems,
                function(error) {
                    window.console && console.log("error in getLocation:", error);
                }
            );
        };
    };

    /*
     * the actual viewModel class
     */
    function ItemsViewModel() {
        var self = this;


        // TODO refactor this to general module
        /* Full item data loading and caching.
         * If an item is already loaded, it is present in the cache map and served directly.
         * If not, it is loaded async and added to the cache.
         */
        var loadItemAsync = function(item) {
            window.console && console.log("loading itemId: " + item.id());
            // load data async if not already loaded
            var loadedItem = self.loadedItemsFull()[item.id()];
            if(typeof(loadedItem) === 'undefined') {
                api.itemGET(item.id()
                    , function(fullItem) {
                        var itemsHashMap = self.loadedItemsFull();
                        item.setDataFromItem(fullItem);
                        itemsHashMap[item.id()] = item;
                        item.isLoaded(true);
                        window.console && console.log("loaded item:", item);
                    }
                );
            }
        };

        /* 
         * Set the state of a single item.
         * Deactivates all other previously active items.
         */
        self.setActive = function(item, state) {
            self.setActiveMultiple([item], state);
        };

        /*
         * Set the state of multiple items.
         * Deactivates all other previously active items.
         */
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
        };

        /*
         * Toggle the active-state of a single item.
         */
        self.toggleActive = function(item) {
            window.console && console.log("toggleActive:", item, item.active());
            self.setActive(item, !item.active());
        };

        //
        //data
        //

        self.loadedItemsFull = ko.observable({});
        self.mapitems = ko.observableArray([]);
        self.items = ko.computed(function() {
            var itemsComputed = _.reduceRight(self.mapitems(), function(a, b) {
                return { items: a.items.concat(b.items) };
            }, { items: [] }).items;

            window.console && console.log("ItemsViewModel: items: computed again:", itemsComputed);
            return itemsComputed;
        });
        self.map = ko.observable(new GMap(self.mapitems, self.setActiveMultiple));

        /*
         * open a modal dialog to request an item
         */
        self.showQueryItemDialog = function(item) {
            QueryItemDialog.show(item);
        };

        /*
         * open a modal dialog to show user details
         */
        self.showUserDialog = function(item) {
            window.console && console.log("showUserDialog " + item.user().getFullName());
            UserDetailsDialog.show(item.user());
        };

        /*
         * actions that can be accessed by each item
         */
        self.actions = {
            showQueryItemDialog: self.showQueryItemDialog
            , showUserDialog: self.showUserDialog
            , setActive: self.setActive
            , toggleActive: self.toggleActive
        };

        /*
         * Available query types
         */
        self.queryTypes = ko.observableArray([
            new QueryTypeImpl('Nähe', 'distance', self.mapitems)
            , new QueryTypeImpl('Aktualität', 'fresh', self.mapitems)
            , new QueryTypeImpl('Abholdatum', 'pick_up', self.mapitems)
        ]);
    };

    return ItemsViewModel;
});
