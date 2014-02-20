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
    , 'dialogs/UserDetailsDialog'
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
    , UserDetailsDialog
) {
    function QueryType(name, query, resultProperty) {
        var self = this;
        self.name = name;

        var api_url = "../../api/"
        var reloadHolder = function() {
            holder.compositionComplete();
        }

        self.query = function() {
            jsonHelper.getItems(api_url + query, resultProperty, reloadHolder);
        };
    };

    function ItemsViewModel() {
        var self = this;

        /**
         * only one item can be active
         */
        self.setActive = function(item, state) {
            state = typeof state !== 'undefined' ? state : true; //state defaults to true
            window.console && console.log("setActive: " + item);
            _.each(self.items(), function(it) {
                it.setActive(false);
            });
            item.setActive(state);
        };

        //data
        self.items = ko.observableArray([]);
        self.map = ko.observable(new GMap(self.items, self.setActive));
        self.lastQuery = ko.observable();


        /** open a modal dialog to query an item */
        self.showQueryItemDialog = function(item) {
            QueryItemDialog.show(item).then(function(response) {
                if(typeof response !== 'undefined') {
                    app.showMessage('Dialog closed; response: ' + response);
                }
            });
        };

        /** open a modal dialog to show user details */
        self.showUserDialog = function(item) {
            window.console && console.log("showUserDialog " + item);
            UserDetailsDialog.show(item.user);
        };

        self.queryTypes = ko.observableArray([
            new QueryType('Nähe', 'items_near', self.items)
            , new QueryType('Aktualität', 'items_fresh', self.items)
            , new QueryType('Abholdatum', 'items_pick_up', self.items)
        ]);

        self.goToQueryType = function(queryType) {
            window.console&&console.log("query: " + queryType.name);
            self.lastQuery(queryType.name);
            queryType.query();
        };

        // default query to view
        self.goToQueryType(self.queryTypes()[0]);

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };

    return new ItemsViewModel();
});
