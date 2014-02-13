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
    self.locationsData = new Array();
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

var api_url = "http://localhost:8000/api/"

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

    self.addItem = function(item) {
        self.items.push(item);
    }

    self.queryTypes = ko.observableArray([
            new QueryType('N&auml;he', 'items_near', self.items)
            ]);

    self.queryTypes()[0].query();

}

var viewModel = new ItemsViewModel();
$(document).ready(function () {
    ko.applyBindings(viewModel);
});
