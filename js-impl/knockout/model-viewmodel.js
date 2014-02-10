function Basket(id, name) {
    var self = this;
    self.id = id;
    self.name = name;
}

function MapMarker(lat, lng) {
    var self = this;
    self.lat = ko.observable(lat);
    self.lng = ko.observable(lng);
}

function BasketsViewModel() {
    var self = this;

    //data
    self.baskets = ko.observableArray([]);
    self.map = ko.observable(new MapMarker(46.2, 18.2));

    self.addBasket = function(basket) {
        self.baskets.push(basket);
    }

    $.getJSON(
            "http://localhost:8000/json"
            )
        .done(function(data) {
            window.console&&console.log(data);
            var mappedItems = $.map(data, function(item) { return new Basket(item.id, item.name) });
            self.baskets(mappedItems);
        })
    .fail(function(a, b, c) { alert("fail");
    });
}


$(document).ready(function () {
    ko.applyBindings(new BasketsViewModel());
});
