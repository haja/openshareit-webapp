define(['knockout', 'plugins/dialog', 'dao/api', 'durandal/app'], function(ko, dialog, api, app) {
    var QueryItemDialog = function(item) {
        var self = this;
        self.queryText = ko.observable('');
        self.item = item;
        self.isLoading = ko.observable(false);
    };

    QueryItemDialog.prototype.sendQuery = function() {
        var self = this;
        var queryText = this.queryText;
        var item = this.item;
        var isLoading = this.isLoading;
        window.console && console.log('sending request');

        if(typeof queryText() !== 'undefined') {
            isLoading(true);
            api.requestPOST(item, queryText())
            .done(function() {
                app.showMessage('Anfrage an Artikel ' + item.name() + ' verschickt!');
            })
            .fail(function() {
                app.showMessage('Anfrage an Artikel ' + item.name() + ' leider fehlgeschlagen!');
            })
            .always(function() {
                isLoading(false);
                dialog.close(self, self.queryText());
            });
        }
    };

    QueryItemDialog.prototype.abort = function() {
        dialog.close(this);
    };

    QueryItemDialog.show = function(item) {
        return dialog.show(new QueryItemDialog(item));
    };

    return QueryItemDialog;
});
