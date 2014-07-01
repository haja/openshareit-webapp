/*
 * map data as returned from the API to own domain models.
 */
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

    //
    // Helpers
    //

    /*
     * Set the received data on the resultProperty and map it with given dataMapper and Ctor function.
     */
    var getWithCtor = function(dataMapper, Ctor, jqXHR, resultProperty, afterDoneHook) {
        jqXHR.done(function(data) {
            resultProperty(dataMapper(data, Ctor));
            afterDoneHook && afterDoneHook();
        });
    };

    /*
     * A data mapper, that maps given Ctor over all items of the array, given as data.
     */
    var arrayMapper = function(data, Ctor) {
        return _.map(data, function(dataItem) { return new Ctor(dataItem) })
    };

    /*
     * Call Ctor with given data.
     */
    var objMapper = function(data, Ctor) {
        return new Ctor(data);
    };

    /*
     * Return fun(data);
     */
    var funcMapper = function(data, fun) {
        return fun(data);
    };

    /*
     * Select a property from data, map it with given mapper and Ctor.
     */
    var propertySelector = function(selector, mapper, data, Ctor) {
        return mapper(data[selector], Ctor);
    };

    //
    // Exported functions
    //

    // TODO needs api spec for requests
    /*
     * Get all requests for all given items.
     */
    var getRequestsForItems = function(url, items, afterDoneHook) {
        _.each(items(), function(item) {
            getWithCtor(_.partial(propertySelector, 'requests', arrayMapper), Request, url + item.id, item.requests, afterDoneHook);
        });
    };
    // TODO needs api spec for requests
    /*
     * Get all requets for a single item.
     */
    var getRequestsForSingleItem = function(url, item, afterDoneHook) {
        getWithCtor(_.partial(propertySelector, 'requests', arrayMapper), Request, url + item().id, item().requests, afterDoneHook);
    };

    /*
     * get Items
     */
    obj.getItems = _.partial(getWithCtor, arrayMapper, Item);
    /*
     * get a single item
     */
    obj.getItem = _.partial(getWithCtor, objMapper, Item);
    /*
     * get mapitems
     */
    obj.getMapitems = _.partial(getWithCtor, arrayMapper, Mapitem);
    /*
     * get adresses
     */
    obj.getAddresses = _.partial(getWithCtor, arrayMapper, Address);
    /*
     * get default adress from Profile
     */
    obj.getDefaultAddressFromProfile = _.partial(getWithCtor, funcMapper, function(data) {
        return new Address(data.primaryAddress);
    });
    /*
     * get a profile
     */
    obj.getProfile = _.partial(getWithCtor, objMapper, Profile);
    /*
     * get all requests for all given items
     */
    obj.getRequestsForItems = getRequestsForItems;
    /*
     * get all requests for a single item
     */
    obj.getRequestsForSingleItem = getRequestsForSingleItem;

    return obj;
});
