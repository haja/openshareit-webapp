define([
    ], function(
    ) {
        var getAuthenticationState = function() {
            if(settings.token !== '') {
                return 'authenticated';
            }
            return 'notAuthenticated';
        };

        var settings = {
            token: ''
            , getAuthenticationState: getAuthenticationState
        };
        return settings;
    }
);
