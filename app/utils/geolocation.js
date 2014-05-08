define([
],
function(
) {
    var obj = {};

    obj.getLocation = function(successFn, errorFn) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                successFn({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            }, errorFn);
            return true;
        } else {
            window.console && console.log("geolocation is not supported by this browser");
            return false;
        }
    };

    return obj;
});
