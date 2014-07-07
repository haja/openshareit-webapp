define([
    'dialogs/UserDetailsDialog'
    , 'dao/api'
    , 'knockout'
    , 'models/settings'
],
function(
    UserDetailsDialog
    , api
    , ko
    , settings
) {
    var ctor = function() {};

    var reloadMessages = function(request) {
        request.isLoading(true);
        api.messagesGETforRequest(request)
        .done(function() {
            request.active(true);
        })
        .always(function() {
            request.isLoading(false)
        });
    };

    ctor.prototype.activate = function(data) {
        var self = this;
        window.console && console.log("request-chat: activate", data);
        self.request = data.request;

        // if this request is from us, other user is the owner of the item
        if(parseInt(self.request.from.id) === parseInt(settings.userId())) {
            self.otherUserId = self.request.item.user().id;
        } else {
            self.otherUserId = self.request.from.id;
        }

        self.message = ko.observable('');
    };

    ctor.prototype.uiToggleActive = function() {
        var request = this.request;
        window.console && console.log("uiToggleActive", request);
        if(request.messages().length === 0) {
            reloadMessages(request);
        } else {
            request.active(!request.active());
        }
    };

    ctor.prototype.sendMessage = function(form) {
        var self = this;
        window.console && console.log("submitting text:", self.message());
        self.request.isLoading(true);

        api.messagePOST(self.request.id, self.otherUserId, self.message())
        .done(function() {
            reloadMessages(self.request);
            self.message('');
        })
        .fail(function() {
            self.request.isLoading(false);
        });
    };

    ctor.prototype.approveRequest = function() {
        var request = this.request;
        window.console && console.log("approveRequest", request);
        request.isLoading(true);
        api.requestApprove(request)
        .done(function() {
            request.approved(true);
        })
        .always(function() {
            request.isLoading(false);
        });
    };

    ctor.prototype.showUserDialog = function() {
        var request = this.request;
        window.console && console.log("showUserDialog: ", request);
        UserDetailsDialog.show(request.from);
    };

    return ctor;
});
