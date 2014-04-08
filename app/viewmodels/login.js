define([
    'models/settings'
],
function(
    settings
) {
    var ViewModel = function() {
        var self = this;

        self.doLogin = function(formElement) {
            var email = formElement.elements.email.value;
            var pw = formElement.elements.password.value;
            window.console && console.log("email", email);

            settings.token('testToken');
            window.console && console.log("settings:", settings);
        };
    };

    return new ViewModel();
});
