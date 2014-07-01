/*
 * logout currently logged in user;
 */
define([
    'models/settings'
],
function(
    settings
) {
    var ViewModel = function() {
        var self = this;

        self.activate = function() {
            // delete authorization token. API doesn't provide logout functionality.
            settings.token(undefined);
        };
    };

    return new ViewModel();
});
