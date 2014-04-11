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

        self.loginError = ko.observable(false);
        self.isLoading = ko.observable(false);

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
            self.redirect = redirect || '';
        };
    };

    return new ViewModel();
});
