ko.bindingHandlers.map = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapObj = ko.utils.unwrapObservable(valueAccessor());
        var latLng = new google.maps.LatLng(
                48.2, 16.2
                );

        var mapOptions = { center: latLng,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP};

        mapObj.googleMap = new google.maps.Map(element, mapOptions);
        $(element).data("mapObj",mapObj);

    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapObj = ko.utils.unwrapObservable(valueAccessor());

        var l = mapObj.getLocations();
        window.console&&console.log("l: " + l);
        if(l.length > 0) {
            for(var i = 0; i < mapObj.getLocations().length; i++)
            {
                var loc = mapObj.getLocations()[i];
                window.console&&console.log("load marker: " + loc);
                var latLng = new google.maps.LatLng(
                        ko.utils.unwrapObservable(loc.lat),
                        ko.utils.unwrapObservable(loc.lng)
                        );

                loc._marker = new google.maps.Marker({
                    map: mapObj.googleMap,
                    position: latLng,
                    draggable: false
                });

            }

        }

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
