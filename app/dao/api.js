define([
    'models/settings'
    , 'jquery'
    , 'utils/json-helper'
    , 'underscore'
],
function(
    settings
    , $
    , jsonHelper
    , _
) {
    var apiUrl = 'http://api.ionic.at/';
    var local_apiUrl = "../../api/";

    var doAjax = function(type, relativeUrl, data, dataType) {
        var completeUrl = apiUrl + relativeUrl;
        return $.ajax({
            type: type
            , url: completeUrl
            , data: data
            , dataType: dataType
            , beforeSend: function(jqXHR, jqSettings) {
                if(settings.getAuthenticationState() === 'authenticated') {
                    window.console && console.log("adding token to request " + relativeUrl);
                    jqXHR.setRequestHeader('token', settings.token()); // TODO this throws CORS/same origin policy error
                }
            }
        });
    }

    var jqPost = _.partial(doAjax, 'POST');
    var jqGet = _.partial(doAjax, 'GET');
    var jqGetJSON = _.partial(doAjax, 'GET', _, _, 'json');


    var api = {
        login: function(email, password, successFn, failFn) {
            jqPost('login/', 'username=' + email + '&password=' + password)
            .done(function(data) {
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
        , itemsPOST: function(item) {
            var jqxhr = jqPost('items/', item);
            jqxhr.fail(function(data) {
                window.console && console.log("itemsPOST: failed; error status: " + data.status, data);
            });
            return jqxhr;
        }
    };

    return api;
});
