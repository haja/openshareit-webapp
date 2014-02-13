function Item(id, name, loc, descr) {
    var self = this;
    self.id = id;
    self.name = name;
    self.loc = loc;
    self.description = descr;
    self.active = ko.observable(false);
    self.toggleActive = function() {
        self.active(!self.active());
    };
}

function GMap(items) {
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
                , 'toggleActive': item.toggleActive
            };
        });
    }, self);
}

var api_url = "../api/"

function QueryType(name, query, resultProperty) {
    var self = this;
    self.name = name;

    self.query = function() {
        $.getJSON(
                api_url + query
                )
            .done(function(data) {
                window.console&&console.log(data);
                resultProperty($.map(data, function(item) { return new Item(item.id, item.name, item.location, item.description) }));
            })
        .fail(function(a, b, c) { alert("fail");
        });
    };
}

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
}

var viewModel = new ItemsViewModel();
$(document).ready(function () {
    ko.applyBindings(viewModel);
});
