ko.bindingHandlers.map = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapObj = ko.utils.unwrapObservable(valueAccessor());
        var latLng = new google.maps.LatLng(
                ko.utils.unwrapObservable(mapObj.lat),
                ko.utils.unwrapObservable(mapObj.lng)
                );
        var mapOptions = { center: latLng,
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP};

        mapObj.googleMap = new google.maps.Map(element, mapOptions);

        mapObj.marker = new google.maps.Marker({
            map: mapObj.googleMap,
            position: latLng,
            title: "You Are Here",
            draggable: true
        });

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

        $(element).data("mapObj",mapObj);
    }
};
