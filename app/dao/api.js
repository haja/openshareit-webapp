define([
    'models/settings'
    , 'jquery'
],
function(
    settings
    , $
) {
    var apiUrl = 'http://api.ionic.at/';
    var api = {
        login: function(email, password, successFn, failFn) {
            $.post(apiUrl + 'login/', 'username=' + email + '&password=' + password, function(data) {
                settings.token(data);
                window.console && console.log("Successfully logged in! settings:", settings);
                successFn(data);
            })
            .fail(function() {
                failFn();
            });
        }
    };

    return api;
});
