define([
    'knockout'
    , 'dialogs/UserDetailsDialog'
],
function(
    ko
    , UserDetailsDialog
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
    };

    return new Ctor();
});
