function Basket(id, description) {
    var self = this;
    self.id = id;
    self.description = description;
}

function BasketsViewModel() {
    var self = this;

    //data
    self.baskets = ko.observableArray([
            new Basket(0, "asdf"),
            new Basket(1, "asdf2"),
            new Basket(12, "asdf3")
            ]);
}

ko.applyBindings(new BasketsViewModel());
