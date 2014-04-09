define([
    'knockout'
    , 'underscore'
    , 'holderjs'
    , 'utils/json-helper'
    , 'utils/QueryType'
    , 'dialogs/UserDetailsDialog'
    , 'plugins/router'
],
function(
    ko
    , _
    , holder
    , jsonHelper
    , QueryType
    , UserDetailsDialog
    , router
) {
    var ctor = function() {};

    ctor.prototype.activate = function(settings) {
        window.console && console.log("request-chat: activate", settings);
        this.request = settings.request;
    };

    ctor.prototype.uiToggleActive = function() {
        var request = this.request;
        window.console && console.log("uiToggleActive", request);
        request.active(!request.active());
    };

    ctor.prototype.showUserDialog = function() {
        var request = this.request;
        window.console && console.log("showUserDialog: ", request);
        UserDetailsDialog.show(request.from);
    };






    ctor.prototype.compositionComplete = holder.compositionComplete;

    return ctor;
});
