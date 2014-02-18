define([
    'jquery'
    , 'models/Item'
],
function(
    $
    , Item
) {
    var obj = {};
    obj.getItems = function(url, resultProperty) {
        $.getJSON(
            url
        )
        .done(function(data) {
            window.console&&console.log(data);
            resultProperty($.map(data, function(item) { return new Item(item.id, item.name, item.location, item.description) }));
        })
        .fail(function(a, b, c) { alert("fail");
        });
    };

    return obj;
});
