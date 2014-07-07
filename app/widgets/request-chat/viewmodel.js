define([
    'dialogs/UserDetailsDialog'
    , 'dao/api'
],
function(
    UserDetailsDialog
    , api
) {
    var ctor = function() {};

    ctor.prototype.activate = function(settings) {
        window.console && console.log("request-chat: activate", settings);
        this.request = settings.request;
        this.otherUserId = this.request.from.id;
    };

    ctor.prototype.uiToggleActive = function() {
        var request = this.request;
        window.console && console.log("uiToggleActive", request);
        if(request.messages().length === 0) {
            request.isLoading(true);
            api.messagesGETforRequest(request)
            .done(function() {
                request.active(true);
            })
            .always(function() {
                request.isLoading(false)
            });
        } else {
            request.active(!request.active());
        }
    };

    ctor.prototype.showUserDialog = function() {
        var request = this.request;
        window.console && console.log("showUserDialog: ", request);
        UserDetailsDialog.show(request.from);
    };

    return ctor;
});
