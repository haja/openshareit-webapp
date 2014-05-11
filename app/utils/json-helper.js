define([
    'jquery'
    , 'underscore'
    , 'knockout'
    , 'models/Item'
    , 'models/Mapitem'
    , 'models/Address'
    , 'models/Profile'
    , 'models/Request'
],
function(
    $
    , _
    , ko
    , Item
    , Mapitem
    , Address
    , Profile
    , Request
) {
    var obj = {};
    var getWithCtor = function(dataMapper, Ctor, url, resultProperty, afterDoneHook) {
        $.getJSON(
            url
        )
        .done(function(data) {
            resultProperty(dataMapper(data, Ctor));
            afterDoneHook && afterDoneHook();
        })
        .fail(function(a, b, c) { alert("fail a: " + a + " b: " + b + " c: " + c);
        });
    };
    var arrayMapper = function(data, Ctor) {
        return _.map(data, function(dataItem) { return new Ctor(dataItem) })
    };
    var objMapper = function(data, Ctor) {
        return new Ctor(data);
    };

    var propertySelector = function(selector, mapper, data, Ctor) {
        return mapper(data[selector], Ctor);
    };

    var getRequestsForItems = function(url, items, afterDoneHook) {
        _.each(items(), function(item) {
            getWithCtor(_.partial(propertySelector, 'requests', arrayMapper), Request, url + item.id, item.requests, afterDoneHook);
        });
    };

    var getRequestsForSingleItem = function(url, item, afterDoneHook) {
        getWithCtor(_.partial(propertySelector, 'requests', arrayMapper), Request, url + item().id, item().requests, afterDoneHook);
    };


    obj.getItems = _.partial(getWithCtor, arrayMapper, Item);
    obj.getItem = _.partial(getWithCtor, objMapper, Item);
    obj.getMapitems = _.partial(getWithCtor, arrayMapper, Mapitem);
    obj.getAddresses = _.partial(getWithCtor, arrayMapper, Address);
    obj.getProfile = _.partial(getWithCtor, objMapper, Profile);
    obj.getRequestsForItems = getRequestsForItems;
    obj.getRequestsForSingleItem = getRequestsForSingleItem;

    return obj;
});
