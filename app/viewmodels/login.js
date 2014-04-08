define([
    'knockout'
    ,'models/settings'
    , 'jquery'
],
function(
    ko
    , settings
    , $
) {
    var ViewModel = function() {
        var self = this;

        self.loginError = ko.observable(false);
        self.isLoading = ko.observable(false);

        self.doLogin = function(formElement) {
            var email = formElement.elements.email.value;
            var pw = formElement.elements.password.value;
            window.console && console.log("email", email);

            self.isLoading(true);

            $.post('http://api.ionic.at/login/', 'username=' + email + '&password=' + pw, function(data) {
                settings.token(data);
                window.console && console.log("settings:", settings);
                self.loginError(false);
                self.isLoading(false);

                // TODO trigger navigation
            })
            .fail(function() {
                self.loginError(true);
                self.isLoading(false);
            });
        };
    };

    return new ViewModel();
});
