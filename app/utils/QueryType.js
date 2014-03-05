define([
    'utils/holder'
    , 'utils/json-helper'
],
function(
    holder
    , jsonHelper
) {
    var QueryType = function(name, query, resultProperty) {
        var self = this;
        self.name = name;

        var api_url = "../../api/"
        var reloadHolder = function() {
            holder.compositionComplete();
        }

        self.query = function() {
            jsonHelper.getItems(api_url + query, resultProperty, reloadHolder);
        };
    };

    return QueryType;
});
