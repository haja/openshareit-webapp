define([
    'knockout'
    , 'dao/api'
    ], function(
        ko
        , api
    ) {
        var ViewModel = function() {
            var self = this;
            self.user = ko.observable({
                first_name: ""
                , last_name: ""
                , email: ""
            });

            // UI data
            self.isWorking = ko.observable(false);
            self.error = ko.observable(false);

            // methods

            self.updateProfile = function() {

            };

            self.activate = function() {
                api.profileGET(self.user);
            };
        };

        return new ViewModel();
    }
);
