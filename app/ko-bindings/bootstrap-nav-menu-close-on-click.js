define(['knockout', 'jquery', 'durandal/composition'], function(ko, $, composition) {
    composition.addBindingHandler('bootstrapNavMenuCloseOnClick', {
        init: function (element, valueAccessor) {
            window.console && console.log("bootstrapNavMenuCloseOnClick init");
            $(element).on('click', 'a.navbar-link', null, function () {
                var navbarToggle = $('.navbar-toggle');
                if (navbarToggle.is(':visible')) {
                    navbarToggle.trigger('click');
                }
            });
        }
    });
});
