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
            window.console && console.log(data);
            self.item = data.item;
            self.parent = data.parent;
        };

        /** open a modal dialog to show user details */
        self.showUserDialog = function() {
            window.console && console.log("showUserDialog " + self.item.user.getFullName());
            UserDetailsDialog.show(self.item.user);
        };
    };

    return new Ctor();
});
