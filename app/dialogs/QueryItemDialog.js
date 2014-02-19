define(['knockout', 'plugins/dialog'], function(ko, dialog) {
    var QueryItemDialog = function(item) {
        var self = this;
        self.queryText = ko.observable('');
        self.item = item;
    };

    QueryItemDialog.prototype.sendQuery = function() {
        window.console && console.log('TODO sending query');
        dialog.close(this, this.queryText());
    };

    QueryItemDialog.prototype.abort = function() {
        dialog.close(this);
    };

    QueryItemDialog.show = function(item) {
        return dialog.show(new QueryItemDialog(item));
    };

    return QueryItemDialog;
});
