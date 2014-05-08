define([
    'models/settings'
    , 'jquery'
    , 'utils/json-helper'
],
function(
    settings
    , $
    , jsonHelper
) {
    var apiUrl = 'http://api.ionic.at/';
    var local_apiUrl = "../../api/";
    var api = {
        login: function(email, password, successFn, failFn) {
            $.post(apiUrl + 'login/', 'username=' + email + '&password=' + password, function(data) {
                settings.token(data.token);
                window.console && console.log("Successfully logged in! settings:", settings);
                successFn(data);
            })
            .fail(function() {
                failFn();
            });
        }
        , mapitemsGET: function(position, view, resultProperty, afterDoneHook) {
            // TODO view === ordering? api needs to specify
            //var completeUrl = apiUrl + 'mapitems/';
            var completeUrl = local_apiUrl + 'mapitems';
            window.console && console.log("loading mapitems with position:", position);
            jsonHelper.getMapitems(completeUrl + '?view=' + view + '&latitude=' + position.latitude + "&longitude=" + position.longitude, resultProperty, afterDoneHook);
        }
        , itemGET: function(itemId, resultProperty, afterDoneHook) {
            //var completeUrl = apiUrl + 'items/';
            var completeUrl = local_apiUrl + 'item_';
            jsonHelper.getItem(completeUrl + itemId, resultProperty, afterDoneHook);
        }
    };

    return api;
});
