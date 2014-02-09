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

}

var viewmodel = new BasketsViewModel();
ko.applyBindings(viewmodel);

    /* fill with testdata */
for (var i = 0; i < 15; i++) {
    viewmodel.addBasket(new Basket(i, "asdf" + i));
}


