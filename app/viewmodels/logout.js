define([
    'models/settings'
],
function(
    settings
) {
    var ViewModel = function() {
        var self = this;

        self.activate = function() {
            settings.token(undefined);
        };
    };

    return new ViewModel();
});
