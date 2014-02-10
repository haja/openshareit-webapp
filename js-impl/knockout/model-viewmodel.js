function Basket(id, name) {
    var self = this;
    self.id = id;
    self.name = name;
}

function BasketsViewModel() {
    var self = this;

    //data
    self.baskets = ko.observableArray([]);

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
        .fail(function(a, b, c) { alert("fail"); });
}

var viewmodel = new BasketsViewModel();
ko.applyBindings(viewmodel);

