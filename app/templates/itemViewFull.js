define([
    'knockout'
    , 'dialogs/UserDetailsDialog'
    , 'utils/holder'
],
function(
    ko
    , UserDetailsDialog
    , holder
) {
    function Ctor () {
        var self = this;

        self.activate = function(data) {
            window.console && console.log("itemViewFull ***** activate ****");
            window.console && console.log(data);
            self.item = data.item;
            self.parent = data.parent;
        };

        /** open a modal dialog to show user details */
        self.showUserDialog = function() {
            window.console && console.log("showUserDialog " + self.item.user.getFullName());
            UserDetailsDialog.show(self.item.user);
        };

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };

    return new Ctor();
});
