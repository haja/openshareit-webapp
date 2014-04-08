define([
    'knockout'
],
function(
    ko
) {
    var getAuthenticationState = function() {
        if(settings.token() !== '') {
            return 'authenticated';
        }
        return 'notAuthenticated';
    };

    var settings = {
        token: ko.observable('')
        , getAuthenticationState: getAuthenticationState
    };
    return settings;
});
