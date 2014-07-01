/*
 * login dialog; Log in a registered user, display error on invalid credentials.
 */
define([
    'knockout'
    , 'jquery'
    , 'plugins/router'
    , 'dao/api'
],
function(
    ko
    , $
    , router
    , api
) {
    var ViewModel = function() {
        var self = this;

        //
        // data
        //

        /*
         * If true, display a login error message.
         */
        self.loginError = ko.observable(false);

        /*
         * If true, a request to the server is active
         */
        self.isLoading = ko.observable(false);

        /*
         * Try to login a user.
         */
        self.doLogin = function(formElement) {
            var email = formElement.elements.email.value;
            var pw = formElement.elements.password.value;
            window.console && console.log("login in user with email:", email);

            self.isLoading(true);

            api.login(email, pw, function(data) {
                self.loginError(false);
                self.isLoading(false);

                router.navigate(self.redirect, { replace: true, trigger: true });
            },
            function() {
                self.loginError(true);
                self.isLoading(false);
            });
        };

        self.activate = function(redirect) {
            // if no redirect is given, redirect to home screen after successfull login.
            self.redirect = redirect || '';
        };
    };

    return new ViewModel();
});
