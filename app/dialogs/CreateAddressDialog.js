define([
    'knockout'
    , 'plugins/dialog'
    , 'dao/api'
    ], function(
        ko
        , dialog
        , api
    ) {
        var CreateAddressDialog = function() {
            var self = this;
            self.street = ko.observable();
            self.houseNumber = ko.observable();
            self.postalCode = ko.observable();
            self.city = ko.observable();
            self.province = ko.observable();
            self.country = ko.observable();

            // UI data
            self.isWorking = ko.observable(false);
            self.error = ko.observable(false);
        };

        CreateAddressDialog.prototype.createAddress = function() {
            var address, working, self;
            self = this;

            self.isWorking(true);
            self.error(false);

            working = this.isWorking;
            address = {
                street: this.street()
                , houseNumber: this.houseNumber()
                , postalCode: this.postalCode()
                , city: this.city()
                , province: this.province()
                , country: this.country()
                // TODO following is for debugging only
                //, user: "http://api.ionic.at/registration/1/"
                //, coordinates: "asdf"
            };
            window.console && console.log('creating address', address);

            api.addressesPOST(address)
            .done(function(data) {
                window.console && console.log('address created! data:', data);
                dialog.close(this, address);
            })
            .fail(function(error) {
                window.console && console.log('address creation failed! error status:' + error.status, error);
                // TODO switch display on error code
                self.error(error);
                self.isWorking(false);
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
