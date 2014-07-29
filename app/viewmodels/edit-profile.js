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
            self.user = ko.observable({});

            // UI data
            self.isWorking = ko.observable(false);
            self.error = ko.observable(false);
            self.success = ko.observable(false);

            // methods

            // user profile update
            self.updateProfile = function() {
                var userPlain = self.user().getPlainObject();
                delete userPlain.dateJoined;

                self.success(false);
                self.isWorking(true);
                window.console && console.log("user patch with", userPlain);
                api.profilePATCH(userPlain)
                .done(function() {
                    self.success(true);
                })
                .fail(function(error) {
                    self.error(error);
                })
                .always(function() {
                    self.isWorking(false);
                });
            };

            self.activate = function() {
                api.profileGET(self.user);
            };
        };

        return ViewModel;
    }
);
