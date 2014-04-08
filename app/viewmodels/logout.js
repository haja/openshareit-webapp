define([
    'models/settings'
],
function(
    settings
) {
    var ViewModel = function() {
        var self = this;

        self.activate = function() {
            settings.token('');
            window.console && console.log("settings:", settings);
        };
    };

    return new ViewModel();
});
