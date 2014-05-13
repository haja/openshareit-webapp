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
        var completeUrl = apiUrl + relativeUrl;
        return $.ajax({
            type: type
            , url: completeUrl
            , data: data
            , dataType: dataType
            , beforeSend: function(jqXHR, jqSettings) {
                if(settings.getAuthenticationState() === 'authenticated') {
                    window.console && console.log("adding authorization token to request " + relativeUrl);
                    jqXHR.setRequestHeader('Authorization', settings.token());
                }
            }
        }).fail(function(data) {
            window.console && console.log("(EE) request to " + completeUrl + " failed; status: " + data.status, data);
            //alert("(EE) request to " + completeUrl + " failed; status: " + data.status, data);
        }).done(function(data) {
            window.console && console.log("response for " + completeUrl, data);
        });
    }

    var jqPost = _.partial(doAjax, 'POST');
    var jqGet = _.partial(doAjax, 'GET');
    var jqGetJSON = _.partial(doAjax, 'GET', _, _, 'json');


    var api = {
        login: function(email, password, successFn, failFn) {
            jqPost('login/', 'username=' + email + '&password=' + password)
            .done(function(data) {
                settings.token("Token " + data.token);
                window.console && console.log("Successfully logged in! settings:", settings);
                successFn(data);
            })
            .fail(function() {
                failFn();
            });
        }
        , mapitemsGET: function(position, order, resultProperty, afterDoneHook) {
            var url = 'mapitems/';
            //var url = 'mapitems';
            window.console && console.log("loading mapitems with position:", position);
            mapper.getMapitems(jqGetJSON(url + '?order=' + order + '&latitude=' + position.latitude + "&longitude=" + position.longitude), resultProperty, afterDoneHook);
        }
        , itemGET: function(itemId, resultProperty, afterDoneHook) {
            var url = 'items/';
            //var url = 'item_';
            mapper.getItem(jqGetJSON(url + itemId + "/"), resultProperty, afterDoneHook);
        }
        , itemsGET: function(view, resultProperty, afterDoneHook) {
            var url = 'items/';
            mapper.getItems(jqGetJSON(url + '?view=' + view), resultProperty, afterDoneHook);
        }
        , itemsGETwithRequests: function(view, resultProperty, afterDoneHook) {
            var requetsUrl = 'requests/';
            api.itemsGET(view, resultProperty,
            afterDoneHook);
            /*function() {
                getRequestsForItems(jqGetJSON(requestsUrl), resultProperty, afterDoneHook); // TODO implement correctly, api needs to specify
                }); */
        }
        , itemsPOST: function(item) {
            item.user = 1; // TODO remove this, for debugging only
            return jqPost('items/', item);
        }
        , addressesGET: function(resultProperty, afterDoneHook) {
            var url = 'addresses/';
            mapper.getAddresses(jqGetJSON(url), resultProperty, afterDoneHook);
        }
        , addressesPOST: function(address) {
            var url = 'addresses/';
            return jqPost(url, address);
        }
        , profileGET: function(resultProperty, afterDoneHook) {
            var url = 'users/';
            mapper.getProfile(jqGetJSON(url), resultProperty, afterDoneHook);
        }
    };

    return api;
});
