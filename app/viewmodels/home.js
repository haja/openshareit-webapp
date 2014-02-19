define([
    'knockout'
    , 'durandal/app'
    , 'jquery'
    , 'ko-bindings/google-maps-binding'
    , 'utils/holder'
    , 'models/GMap'
    , 'utils/json-helper'
],
function(
    ko
    , app
    , $
    , gmaps_binding
    , holder
    , GMap
    , jsonHelper
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

        //data
        self.items = ko.observableArray([]);
        self.map = ko.observable(new GMap(self.items));
        self.lastQuery = ko.observable();

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
