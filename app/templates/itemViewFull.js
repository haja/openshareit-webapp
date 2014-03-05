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
            self.item = data.item
        };

        /** open a modal dialog to show user details */
        self.showUserDialog = function(item) {
            window.console && console.log("showUserDialog " + item);
            UserDetailsDialog.show(item.user);
        };

        // load holderjs images
        self.compositionComplete = holder.compositionComplete;
    };

    return new Ctor();
});
