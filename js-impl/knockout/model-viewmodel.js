function Item(id, name, loc) {
    var self = this;
    self.id = id;
    self.name = name;
    self.loc = loc;
}

function GMap(items) {
    var self = this;
    self.items = items;
    self.getLocations = function() {
        return $.map(ko.utils.unwrapObservable(self.items), function(item) {
            var c = item.loc.coordinates;
            return {lat: c.latitude,
                lng: c.longitude};
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

    $.getJSON(
            "http://localhost:8000/json"
            )
        .done(function(data) {
            window.console&&console.log(data);
            var mappedItems = $.map(data, function(item) { return new Item(item.id, item.name, item.location) });
            self.items(mappedItems);
        })
    .fail(function(a, b, c) { alert("fail");
    });
}

var viewModel = new ItemsViewModel();
$(document).ready(function () {
    ko.applyBindings(viewModel);
});
