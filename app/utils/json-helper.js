define([
    'jquery'
    , 'underscore'
    , 'models/Item'
    , 'models/Address'
    , 'models/Profile'
],
function(
    $
    , _
    , Item
    , Address
    , Profile
) {
    var obj = {};
    var getWithCtor = function(dataMapper, Ctor, url, resultProperty, afterDoneHook) {
        $.getJSON(
            url
        )
        .done(function(data) {
            window.console&&console.log(data);
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

    obj.getItems = _.partial(getWithCtor, arrayMapper, Item);
    obj.getItem = _.partial(getWithCtor, objMapper, Item);
    obj.getAddresses = _.partial(getWithCtor, arrayMapper, Address);
    obj.getProfile = _.partial(getWithCtor, objMapper, Profile);

    return obj;
});
