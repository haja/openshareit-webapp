define([
    'jquery'
    , 'underscore'
    , 'knockout'
    , 'models/Item'
    , 'models/Address'
    , 'models/Profile'
],
function(
    $
    , _
    , ko
    , Item
    , Address
    , Profile
) {
    var log = function(msg) { window.console && console.log(msg); };
    var obj = {};
    var getWithCtor = function(dataMapper, Ctor, url, resultProperty, afterDoneHook) {
        $.getJSON(
            url
        )
        .done(function(data) {
            log(data);
            resultProperty(dataMapper(data, Ctor));
            afterDoneHook && afterDoneHook();
        })
        .fail(function(a, b, c) { alert("fail");
        });
    };
    var arrayMapper = function(data, Ctor) {
        return _.map(data, function(dataItem) { return new Ctor(dataItem) })
    };
    var objMapper = function(data, Ctor) {
        return new Ctor(data);
    };

    var getRequestsForItems = function(url, items) {
        window.console && console.log("getRequestsForItems: ", items());
        _.each(items(), function(item) {
            $.getJSON(url + item.id)
            .done(function(req) {
                window.console && console.log("received request: %o", req);
                item.requests(req.requests);
            })
            .fail(function(a, b, c) { alert("fail a: " + a + " b: " + b + " c: " + c);
            });
        });
    };


    obj.getItems = _.partial(getWithCtor, arrayMapper, Item);
    obj.getItem = _.partial(getWithCtor, objMapper, Item);
    obj.getAddresses = _.partial(getWithCtor, arrayMapper, Address);
    obj.getProfile = _.partial(getWithCtor, objMapper, Profile);
    obj.getRequestsForItems = getRequestsForItems;

    return obj;
});
