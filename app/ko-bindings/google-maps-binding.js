define(['knockout', 'jquery', 'durandal/composition', 'async!http://maps.google.com/maps/api/js?sensor=false'], function(ko, $, composition) {
    composition.addBindingHandler('map', {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            window.console&&console.log("loading google maps custom bindings");
            var mapWrapper = ko.utils.unwrapObservable(valueAccessor());
            mapWrapper.data._markerData = {};
            mapWrapper.data.map = {};
            var mapObj = mapWrapper.data.map;

            var latLng = new google.maps.LatLng(
                48.2, 16.2 /* only default until locations are loaded */
            );

            var mapOptions = { center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP};

                mapObj.googleMap = new google.maps.Map(element, mapOptions);
                $(element).data("mapObj",mapObj);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var mapWrapper = ko.utils.unwrapObservable(valueAccessor());
            var locations = mapWrapper.locations;
            var locationsData = mapWrapper.data._markerData;
            var bounds = new google.maps.LatLngBounds();

            window.console&&console.log("locations:", locations);
            $.each(locations, function(idx, loc) {
                if(!locationsData[loc.id]) {
                    window.console&&console.log("creating new locData " + loc.id);
                    locationsData[loc.id] = {};
                }
                var locData = locationsData[loc.id];

                var latLng = new google.maps.LatLng(loc.latitude, loc.longitude);
                if(!locData._marker) {
                    window.console&&console.log("create marker:", loc);
                    locData._marker = new google.maps.Marker({
                        map: mapWrapper.data.map.googleMap,
                        position: latLng,
                        title: "ID: " + loc.id,
                        draggable: false
                        , clickable: true
                    });
                }
                // listener needs to be recreated, item could be new
                google.maps.event.clearListeners(locData._marker, 'click');
                google.maps.event.addListener(locData._marker, 'click', loc.setActive);

                if(loc.active) {
                    // open infoWindow only if not already active
                    if(!locData._infoWindow) {
                        locData._infoWindow = new google.maps.InfoWindow({
                            content: $("#item_" + loc.id).clone()[0]
                        })
                        locData._infoWindow.open(mapWrapper.data.map.googleMap, locData._marker);
                        google.maps.event.addListener(locData._infoWindow, 'closeclick', loc.setInactive);
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
            });
            mapWrapper.data.map.googleMap.fitBounds(bounds);

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
    });
});
