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
            window.console && console.log("email", email);

            self.isLoading(true);

            api.login(email, pw, function(data) {
                self.loginError(false);
                self.isLoading(false);

                router.navigate('');
            },
            function() {
                self.loginError(true);
                self.isLoading(false);
            });
        };
    };

    return new ViewModel();
});
