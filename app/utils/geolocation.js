define([
],
function(
) {
    var obj = {};

    var cachedPosition;
    obj.getLocation = function(successFn, errorFn) {
        if(navigator.geolocation) {
            window.console && console.log("geolocation should be available");
            navigator.geolocation.getCurrentPosition(function(position) {
                window.console && console.log("returning geolocation:", position);
                cachedPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                successFn(cachedPosition);
            }, function(error) {
                window.console && console.log("error while retrieving geolocation", error);
                errorFn
            });
            return true;
        } else {
            window.console && console.log("geolocation is not supported by this browser");
            return false;
        }
    };

    obj.getLocationCached = function(successFn, errorFn) {
        if(cachedPosition) {
            successFn(cachedPosition);
            return true;
        } else {
            return obj.getLocation(successFn, errorFn);
        }
    };

    return obj;
});
