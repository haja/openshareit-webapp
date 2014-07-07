define([
    'knockout'
    , 'ko-extenders/cookie'
],
function(
    ko
) {
    var getAuthenticationState = function() {
        if(typeof(settings.token()) !== 'undefined') {
            return 'authenticated';
        }
        return 'notAuthenticated';
    };

    var settings = {
        token: ko.observable().extend({ cookie: 'token' })
        , userId: ko.observable().extend({ cookie: 'userId' })
        , getAuthenticationState: getAuthenticationState
    };
    return settings;
});
