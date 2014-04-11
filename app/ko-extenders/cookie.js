define([
    'knockout'
    , 'jquery'
    , 'jquery.cookie'
],
function(
    ko
    , $
) {
    window.console && console.log("loading cookie extender");
    ko.extenders.cookie = function(target, cookieName) {
        var initVal = target();
        // load from cookie if exists
        var cookieVal = $.cookie(cookieName);

        if(typeof(cookieVal) !== 'undefined') {
            initVal = cookieVal;
        }

        target(initVal);

        // sync new values to the cookie
        target.subscribe(function (newVal) {
            // delete cookie if value is undefined
            if(typeof(newVal) === 'undefined') {
                $.removeCookie(cookieName);
            } else {
                $.cookie(cookieName, newVal);
            }
        });
        return target;
    };
});
