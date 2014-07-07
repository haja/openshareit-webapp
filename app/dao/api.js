/*
 * API dao; Access functionality of the REST API.
 */
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

    /*
     * modify each ajax call; set authorization header token if present.
     * print debuging messages to console.
     */
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

    /*
     * shorthands to use modified ajax call
     */
    var jqPost = _.partial(doAjax, 'POST');
    var jqGet = _.partial(doAjax, 'GET');
    var jqGetJSON = _.partial(doAjax, 'GET', _, _, 'json');


    var api = {
        login: function(email, password, successFn, failFn) {
            jqPost('login/', 'username=' + email + '&password=' + password)
            .done(function(data) {
                settings.token("Token " + data.token);
                api.profileGET(function(profile) {
                    settings.userId(profile.id);
                    window.console && console.log("Successfully logged in! settings:", settings);
                    successFn(data);
                });
            })
            .fail(function() {
                failFn();
            });
        }
        , mapitemsGET: function(position, order, resultProperty, afterDoneHook) {
            var distance = 0.0001;
            var url = 'mapitems/';
            //var url = 'mapitems';
            window.console && console.log("loading mapitems with position:", position);
            mapper.getMapitems(jqGetJSON(url + '?order=' + order + '&latitude=' + position.latitude + "&longitude=" + position.longitude + "&distance=" + distance), resultProperty, afterDoneHook);
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
            var url = '/requests/';
            var deferreds;
            api.itemsGET(view, function(items) {
                deferreds = _.map(items, function(item) {
                    return mapper.getRequestsForSingleItem(jqGetJSON('items/' + item.id() + url), function(requests) {
                        item.requests(requests);
                    });
                });
                $.when.apply(null, deferreds).done(function() {
                    resultProperty(items);
                    afterDoneHook && afterDoneHook();
                });
            });
        }
        , itemsPOST: function(item) {
            item.user = settings.userId(); // TODO remove this, api needs to provide user on post
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
        , defaultAddressGET: function(resultProperty, afterDoneHook) {
            var url = 'users/';
            mapper.getDefaultAddressFromProfile(jqGetJSON(url), resultProperty, afterDoneHook);
        }
        , profileGET: function(resultProperty, afterDoneHook) {
            var url = 'users/self/';
            mapper.getProfile(jqGetJSON(url), resultProperty, afterDoneHook);
        }
        , messagesGETforRequest: function(request) {
            var url = 'requests/';
            var url2 = '/messages/';
            return mapper.getMessagesForRequest(jqGetJSON(url + request.id + url2), request.messages);
        }
        , requestPOST: function(item, reqMessage) {
            var url = 'requests/';
            var urlMessages = 'messages/';
            var deferred = $.Deferred();
            window.console && console.log("requesting item", item, reqMessage, settings.userId());
            jqPost(url, { 'item': parseInt(item.id()), 'user': parseInt(settings.userId()), 'approved': false })
            .done(function(data) {
                jqPost(urlMessages, {
                    'request': data.id
                    , 'sender': parseInt(settings.userId())
                    , 'recipient': item.user().id
                    , 'message': reqMessage
                })
                .done(function() {
                    deferred.resolve();
                })
                .fail(function() {
                    deferred.reject();
                })
            })
            .fail(function() {
                deferred.reject();
            });
            return deferred;
        }
    };

    return api;
});
