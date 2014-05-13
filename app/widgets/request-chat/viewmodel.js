define([
    'holderjs'
    , 'dialogs/UserDetailsDialog'
],
function(
    holder
    , UserDetailsDialog
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
