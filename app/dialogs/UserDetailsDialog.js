define(['knockout', 'plugins/dialog', 'utils/holder'], function(ko, dialog, holder) {
    var UserDetailsDialog = function(user) {
        var self = this;
        self.user = user;
    };

    UserDetailsDialog.prototype.close = function() {
        dialog.close(this);
    };

    UserDetailsDialog.show = function(user) {
        return dialog.show(new UserDetailsDialog(user));
    };

    UserDetailsDialog.prototype.compositionComplete = function() {
        holder.compositionComplete();
    };

    return UserDetailsDialog;
});
