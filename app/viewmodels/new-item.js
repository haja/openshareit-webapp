/*
 * create a new item or edit an existing item (if itemId is passed on activation)
 */
define([
    'knockout'
    , 'utils/holder'
    , 'plugins/router'
    , 'bootstrap-datepicker'
    , 'jquery'
    , 'moment'
    , 'dialogs/CreateAddressDialog'
    , 'dao/api'
    , 'underscore'
    , 'models/Item'
],
function(
    ko
    , holder
    , router
    , datepicker
    , $
    , moment
    , CreateAddressDialog
    , api
    , _
    , Item
) {
    var itemIsValid = function(item) {
        return (item
                && typeof(item.name) === 'string'
                && typeof(item.description) === 'string'
                && item.name !== ''
                && item.description !== '');
    };

    var ViewModel = function() {
        var self = this;

        // data
        self.title = ko.observable();
        self.submitText = ko.observable();
        self.addresses = ko.observableArray([]);
        // id of the user choosen address
        self.choosenAddress = ko.observable(-1);
        self.item = ko.observable(new Item());
        self.itemStatusList = ko.observableArray(api.itemStatusList);
        self.itemStatus = ko.observable(self.itemStatusList()[0]);

        // define different dateformats in one place
        var dateformat = {
            'moment': 'DD.MM.YYYY'
            , 'datepicker': 'dd.mm.yyyy'
            , 'api': 'YYYY-MM-DDTHH:mm'
        };
        self.pickupDate = ko.observable(moment().add('d', 1).format(dateformat.moment));

        // behaviour

        // open a modal dialog to create an address
        self.showCreateAddressDialog = function() {
            window.console && console.log("showCreateAddressDialog");
            CreateAddressDialog.show().then(function(response) {
                if(typeof response !== 'undefined') {
                    self.addresses.push(response);
                }
            });
        };

        // get the address object that matches the chooosenAddress ID
        self.getChoosenAddress = function() {
            var choosenAddr = parseInt(self.choosenAddress());
            var addr = _.find(self.addresses(), function(address) {
                return address.id === choosenAddr;
            });
            if(typeof(addr) === 'undefined') {
                return {
                    street: ''
                    , houseNumber: ''
                };
            } else {
                return addr;
            }
        };

        self.setAdditionalItemData = function(plainItem) {
            plainItem.location = self.choosenAddress();
            plainItem.pickupDeadline = moment(self.pickupDate(), dateformat.moment).format(dateformat.api);

            plainItem.status = self.itemStatus().apiKey;
        };

        // send updated item to API
        self.updateItem = function(form) {
            var jqxhr;
            var plainItem = self.item().getPlainObject();
            window.console && console.log("updateItem", form, plainItem);

            if(itemIsValid(plainItem)) {
                self.setAdditionalItemData(plainItem);

                //window.console && console.log("submitting item update", plainItem);
            } else {
                window.console && console.log("trying to update with invalid item, aborting", plainItem);
            }
        };

        // send the new item to the API
        self.submitNewItem = function(form) {
            var jqxhr;
            var plainItem = self.item().getPlainObject();
            window.console && console.log("submitNewItem", form, plainItem);

            // somewhat validate data
            if(itemIsValid(plainItem)) {
                self.setAdditionalItemData(plainItem);

                window.console && console.log("submitting item", plainItem);
                jqxhr = api.itemsPOST(plainItem);
                jqxhr.done(function(data) {
                    window.console && console.log("itemsPOST: respones", data);
                    // redirect to myItems and show success message
                    router.navigate('#my-items?itemCreated=true', { replace: true, trigger: true });
                });
                jqxhr.fail(function(data) {
                    window.console && console.log("itemsPOST: failed", data);
                    // TODO display error message
                });
            } else {
                window.console && console.log("trying to submit invalid item, aborting", plainItem);
            }
        };

        self.activate = function(itemId) {
            // load data
            var api_url = "../../api/";
            api.addressesGET(function(addresses) {
                self.addresses(addresses);
                if(typeof(itemId) === 'undefined') {
                    // TODO get default address from api
                    // TODO handle case if no address is available
                    self.choosenAddress(self.addresses()[0].id);
                }
            });

            if(typeof(itemId) !== 'undefined') {
                self.title('Artikel bearbeiten');
                self.submitText('Artikel speichern');
                self.submitAction = self.updateItem;
                // load item data
                api.itemGET(itemId, self.item, function() {
                    window.console && console.log("item loaded", self.item());
                    self.choosenAddress(self.item().loc().id);
                });
            } else {
                self.title('Artikel anlegen');
                self.submitText('Artikel anlegen');
                self.submitAction = self.submitNewItem;
            };
        };

        // load holderjs images and datepicker
        self.compositionComplete = function() {
            $('.datepicker').datepicker({
                format: dateformat.datepicker
                , autoclose: true
            });
            holder.compositionComplete();
        };
    };

    return ViewModel;
});
