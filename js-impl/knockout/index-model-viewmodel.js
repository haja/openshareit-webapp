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

function ItemsViewModel() {
    var self = this;

    //data
    self.items = ko.observableArray([]);
    self.map = ko.observable(new GMap(self.items));

    self.addItem = function(item) {
        self.items.push(item);
    }

    $.getJSON(
            "http://localhost:8000/json"
            )
        .done(function(data) {
            window.console&&console.log(data);
            var mappedItems = $.map(data, function(item) { return new Item(item.id, item.name, item.location, item.description) });
            self.items(mappedItems);
        })
    .fail(function(a, b, c) { alert("fail");
    });
}

var viewModel = new ItemsViewModel();
$(document).ready(function () {

    // setup external templates
    infuser.defaults.templateSuffix = ".tmpl.html";
    infuser.defaults.templateUrl = "templates";

    ko.applyBindings(viewModel);
});
