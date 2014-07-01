/*
 * Edit the currently logged in user's profile
 */
define([
    'knockout'
    , 'dao/api'
    ], function(
        ko
        , api
    ) {
        var ViewModel = function() {
            var self = this;

            // empty observable to set the user data
            self.user = ko.observable({
                first_name: ""
                , last_name: ""
                , email: ""
                , phoneNumber: ""
            });

            // UI data
            self.isWorking = ko.observable(false);
            self.error = ko.observable(false);

            // methods

            // TODO implement user profile update
            self.updateProfile = function() {

            };

            self.activate = function() {
                api.profileGET(self.user);
            };
        };

        return new ViewModel();
    }
);
