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
) {
    var QueryTypeImpl = function(name, query, resultProperty) {
        var self = this;
        self.name = name;

        var api_url = "../../api/";
        self.query = function() {
            jsonHelper.getMapitems(api_url + query, resultProperty, holder.compositionComplete);
        };
    };

    function ItemsViewModel() {
        var self = this;

        /**
        * only one item can be active
        */
        self.setActive = function(item, state) {
            state = typeof state !== 'undefined' ? state : true; //state defaults to true
            window.console && console.log("setActive:", item, item.active());
            // load data async if not already loaded
            var loadedItem = self.loadedItemsFull()[item.id];
            if(typeof(loadedItem) === 'undefined') {
                var api_url = "../../api/";
                jsonHelper.getItem(api_url + "item_" + item.id, function(fullItem) {
                    var itemsHashMap = self.loadedItemsFull();
                    item.setData(fullItem);
                    itemsHashMap[item.id] = item;
                    self.loadedItemsFull(itemsHashMap);
                    item.isLoaded(true);
                    window.console && console.log("setActive; loaded item " + item.id, item);
                }, holder.compositionComplete());
            }

            // update active state
            if(item.active() === state) {
                window.console && console.log("** setActive: same state, not activating");
                return;
            }
            _.each(self.items(), function(it) {
                it.setActive(false);
            });
            item.setActive(state);

            holder.compositionComplete();
        };

        self.setActiveMultiple = function(items, state) {
            window.console && console.log("setActiveMultiple:", items);
            // TODO implement
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
            new QueryTypeImpl('Nähe', 'mapitems_near', self.mapitems)
            , new QueryTypeImpl('Aktualität', 'mapitems_fresh', self.mapitems)
            , new QueryTypeImpl('Abholdatum', 'mapitems_pick_up', self.mapitems)
        ]);

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };

    return new ItemsViewModel();
});
