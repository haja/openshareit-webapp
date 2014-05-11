define([
    'models/settings'
    , 'dao/data-mapper'
    , 'jquery'
    , 'underscore'
],
function(
    settings
    , mapper
    , $
    , _
) {
    var apiUrl = 'http://api.ionic.at/';
    var local_apiUrl = "../../api/";

    var doAjax = function(type, relativeUrl, data, dataType) {
        var completeUrl = apiUrl + relativeUrl; // TODO change this to none-local url
        return $.ajax({
            type: type
            , url: completeUrl
            , data: data
            , dataType: dataType
            , beforeSend: function(jqXHR, jqSettings) {
                if(settings.getAuthenticationState() === 'authenticated') {
                    window.console && console.log("adding authorization token to request " + relativeUrl);
                    jqXHR.setRequestHeader('authorization', settings.token());
                }
            }
        }).fail(function(a, b, c) {
            window.console && console.log("(EE) request to " + completeUrl + " failed", a, b, c);
            alert("(EE) request to " + completeUrl + " failed", a, b, c);
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
            var url = 'mapitems/';
            //var url = 'mapitems';
            window.console && console.log("loading mapitems with position:", position);
            mapper.getMapitems(jqGetJSON(url + '?view=' + view + '&latitude=' + position.latitude + "&longitude=" + position.longitude), resultProperty, afterDoneHook);
        }
        , itemGET: function(itemId, resultProperty, afterDoneHook) {
            var url = 'items/';
            //var url = 'item_';
            mapper.getItem(jqGetJSON(url + itemId + "/"), resultProperty, afterDoneHook);
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
