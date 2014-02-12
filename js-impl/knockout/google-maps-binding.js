ko.bindingHandlers.map = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapWrapper = ko.utils.unwrapObservable(valueAccessor());
        var mapObj = mapWrapper.map;
        var latLng = new google.maps.LatLng(
                48.2, 16.2 /* TODO fix this somehow (load default location and update with data?) */
                );

        var mapOptions = { center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP};

        mapObj.googleMap = new google.maps.Map(element, mapOptions);
        $(element).data("mapObj",mapObj);

    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapWrapper = ko.utils.unwrapObservable(valueAccessor());
        var locations = mapWrapper.locations;
        var locationsData = mapWrapper.locationsData;
        var bounds = new google.maps.LatLngBounds();

        window.console&&console.log("locations: " + locations);
        for(var i = 0; i < locations.length; i++) {
            var loc = locations[i];
            if(!locationsData[i]) {
                window.console&&console.log("creating new locData " + i);
                locationsData[i] = {};
            }
            var locData = locationsData[i];

            var latLng = new google.maps.LatLng(loc.latitude, loc.longitude);
            if(!locData._marker) {
                window.console&&console.log("load marker: " + loc);
                locData._marker = new google.maps.Marker({
                    map: mapWrapper.map.googleMap,
                    position: latLng,
                    title: "ID: " + loc.id,
                    draggable: false
                    , clickable: true
                });

                google.maps.event.addListener(locData._marker, 'click', loc.toggleActive);
            }

            if(loc.active) {
                // open infoWindow only if not already active
                if(!locData._infoWindow) {
                    locData._infoWindow = new google.maps.InfoWindow({
                        content: "Hi!"
                    })
                    locData._infoWindow.open(mapWrapper.map.googleMap, locData._marker);
                }
            } else {
                // hide not active items
                if(locData._infoWindow) {
                    window.console&&console.log(loc.id + " had prev infoWindow, closing...");
                    locData._infoWindow.close();
                    locData._infoWindow = null;
                }
            }

            // center & zoom map to show all markers
            bounds.extend(latLng);
        }
        window.console&&console.log("locData: " + locationsData.length);

        mapWrapper.map.googleMap.fitBounds(bounds);

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
