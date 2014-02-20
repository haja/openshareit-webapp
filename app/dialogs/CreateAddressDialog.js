define([
    'knockout'
    , 'plugins/dialog'
    ], function(
        ko
        , dialog
    ) {
        var CreateAddressDialog = function() {
            var self = this;
            self.street = ko.observable();
            self.houseNumber = ko.observable();
            self.postalCode = ko.observable();
            self.city = ko.observable();
            self.province = ko.observable();
            self.country = ko.observable();
        };

        CreateAddressDialog.prototype.createAddress = function() {
            window.console && console.log('TODO create address');
            this.id = ko.observable(99); // dummy id TODO remove this
            dialog.close(this, {
                id: this.id()
                , street: this.street()
                , houseNumber: this.houseNumber()
                , postalCode: this.postalCode()
                , city: this.city()
                , province: this.province()
                , country: this.country()
            });
        };

        CreateAddressDialog.prototype.abort = function() {
            dialog.close(this);
        };

        CreateAddressDialog.show = function() {
            return dialog.show(new CreateAddressDialog());
        };

        return CreateAddressDialog;
    }
);
