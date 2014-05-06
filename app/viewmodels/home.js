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
        self.mapitems = ko.observableArray([]);
        self.items = ko.computed(function() {
            var itemsComputed = _.reduceRight(self.mapitems(), function(a, b) {
                window.console && console.log("computing:", a, b);
                return { items: a.items.concat(b.items) };
            }, { items: [] });
            window.console && console.log("ItemsViewModel: items: computed again:", itemsComputed);
            return itemsComputed.items;
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
