define([
    'jquery'
    , 'underscore'
    , 'models/Item'
    , 'models/Address'
],
function(
    $
    , _
    , Item
    , Address
) {
    var obj = {};
    var getWithCtor = function(Ctor, url, resultProperty, afterDoneHook) {
        $.getJSON(
            url
        )
        .done(function(data) {
            window.console&&console.log(data);
            resultProperty($.map(data, function(dataItem) { return new Ctor(dataItem) }));
            afterDoneHook && afterDoneHook();
        })
        .fail(function(a, b, c) { alert("fail");
        });
    };

    obj.getItems = _.partial(getWithCtor, Item);
    obj.getAddresses = _.partial(getWithCtor, Address);

    return obj;
});
