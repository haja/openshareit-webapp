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
    , 'models/Message'
],
function(
    _
    , Item
    , Mapitem
    , Address
    , Profile
    , Request
    , Message
) {
    var obj = {};

    //
    // Helpers
    //

    /*
     * Set the received data on the resultProperty and map it with given dataMapper and Ctor function.
     */
    var getWithCtor = function(dataMapper, Ctor, jqXHR, resultProperty, afterDoneHook) {
        return jqXHR.done(function(data) {
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
     * get all requests for a single item
     */
    obj.getRequestsForSingleItem = _.partial(getWithCtor, arrayMapper, Request);
    /*
     * get all messages for a single request
     */
    obj.getMessagesForRequest = _.partial(getWithCtor, arrayMapper, Message);

    return obj;
});
