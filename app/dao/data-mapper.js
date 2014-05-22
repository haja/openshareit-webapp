define([
    'underscore'
    , 'models/Item'
    , 'models/Mapitem'
    , 'models/Address'
    , 'models/Profile'
    , 'models/Request'
],
function(
    _
    , Item
    , Mapitem
    , Address
    , Profile
    , Request
) {
    var obj = {};
    var getWithCtor = function(dataMapper, Ctor, jqXHR, resultProperty, afterDoneHook) {
        jqXHR.done(function(data) {
            resultProperty(dataMapper(data, Ctor));
            afterDoneHook && afterDoneHook();
        });
    };
    var arrayMapper = function(data, Ctor) {
        return _.map(data, function(dataItem) { return new Ctor(dataItem) })
    };
    var objMapper = function(data, Ctor) {
        return new Ctor(data);
    };
    var funcMapper = function(data, fun) {
        return fun(data);
    };
    var propertySelector = function(selector, mapper, data, Ctor) {
        return mapper(data[selector], Ctor);
    };
    // TODO needs api spec for requests
    var getRequestsForItems = function(url, items, afterDoneHook) {
        _.each(items(), function(item) {
            getWithCtor(_.partial(propertySelector, 'requests', arrayMapper), Request, url + item.id, item.requests, afterDoneHook);
        });
    };
    // TODO needs api spec for requests
    var getRequestsForSingleItem = function(url, item, afterDoneHook) {
        getWithCtor(_.partial(propertySelector, 'requests', arrayMapper), Request, url + item().id, item().requests, afterDoneHook);
    };

    obj.getItems = _.partial(getWithCtor, arrayMapper, Item);
    obj.getItem = _.partial(getWithCtor, objMapper, Item);
    obj.getMapitems = _.partial(getWithCtor, arrayMapper, Mapitem);
    obj.getAddresses = _.partial(getWithCtor, arrayMapper, Address);
    obj.getDefaultAddressFromProfile = _.partial(getWithCtor, funcMapper, function(data) {
        return new Address(data.primaryAddress);
    });
    obj.getProfile = _.partial(getWithCtor, objMapper, Profile);
    obj.getRequestsForItems = getRequestsForItems;
    obj.getRequestsForSingleItem = getRequestsForSingleItem;

    return obj;
});
