ko.bindingHandlers.map = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapWrapper = ko.utils.unwrapObservable(valueAccessor());
        var mapObj = mapWrapper.map;
        var latLng = new google.maps.LatLng(
                48.2, 16.2 /* TODO fix this somehow (load default location and update with data?) */
                );

        var mapOptions = { center: latLng,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP};

        mapObj.googleMap = new google.maps.Map(element, mapOptions);
        $(element).data("mapObj",mapObj);

    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapWrapper = ko.utils.unwrapObservable(valueAccessor());
        var locations = mapWrapper.locations;

        window.console&&console.log("locations: " + locations);
        ko.utils.arrayForEach(locations, function(loc) {
            window.console&&console.log("load marker: " + loc);
            var latLng = new google.maps.LatLng(
                loc.lat,
                loc.lng
                );

            loc._marker = new google.maps.Marker({
                map: mapWrapper.map.googleMap,
                position: latLng,
                title: "I'm the title!",
                draggable: false
            });

        });

        /* TODO fixme
           mapObj.onChangedCoord = function(newValue) {
           var latLng = new google.maps.LatLng(
           ko.utils.unwrapObservable(mapObj.lat),
           ko.utils.unwrapObservable(mapObj.lng));
           mapObj.googleMap.setCenter(latLng);
           mapObj.marker.setPosition(latLng);
           window.console&&console.log("coords changed: " + latLng);
           };

           mapObj.onMarkerMoved = function(dragEnd) {
           var latLng = mapObj.marker.getPosition();
           mapObj.lat(latLng.lat());
           mapObj.lng(latLng.lng());
           window.console&&console.log("marker move: " + latLng);
           };

           mapObj.lat.subscribe(mapObj.onChangedCoord);
           mapObj.lng.subscribe(mapObj.onChangedCoord);

           google.maps.event.addListener(mapObj.marker, 'dragend', mapObj.onMarkerMoved);
           */
    }
};
