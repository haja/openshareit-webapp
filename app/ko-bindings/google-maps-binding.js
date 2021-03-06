define(['knockout', 'jquery', 'durandal/composition', 'underscore', 'utils/geolocation', 'async!http://maps.google.com/maps/api/js?sensor=false'], function(ko, $, composition, _, geolocation) {
    var generateInfoWindowContent = function(loc) {
        var str;
        if(loc.items.length > 1) {
            str = "<h5>" + loc.items[0].name() + " + " + (loc.items.length - 1);
            if(loc.items.length === 2) {
                // only one more item
                str = str + " weiterer";
            } else {
                str = str + " weitere";
            }
            str = str + " Artikel</h5><ul>";
            _.each(loc.items, function(item) {
                str = str + "<li>" + item.name() + "</li>";
            });
            str = str + "</ul>";
        } else {
            str = "<h5>" + loc.items[0].name() + "</h5>";
        }
        return str;
    };

    var ownLocation = ko.observable();

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

            var mapOptions = {
                center: latLng
                , mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            mapObj.googleMap = new google.maps.Map(element, mapOptions);
            $(element).data("mapObj",mapObj);

            geolocation.getLocationCached(function(pos) {
                window.console && console.log("setting own position on map", pos);
                ownLocation(new google.maps.Marker({
                    clickable: false
                    , icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png'
                        , new google.maps.Size(22,22)
                        , new google.maps.Point(0,18)
                        , new google.maps.Point(11,11)
                    )
                    , shadow: null
                    , zIndex: 999
                    , map: mapObj.googleMap
                    , position: new google.maps.LatLng(pos.latitude, pos.longitude)
                }));
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var mapWrapper = ko.utils.unwrapObservable(valueAccessor());
            var locations = mapWrapper.locations;
            var locationsData = mapWrapper.data._markerData;
            var bounds = new google.maps.LatLngBounds();

            window.console&&console.log("locations:", locations);
            $.each(locations, function(idx, loc) {
                if(!locationsData[loc.id]) {
                    window.console&&console.log("creating new locData " + loc.id, loc);
                    locationsData[loc.id] = {};
                }
                var locData = locationsData[loc.id];
                window.console&&console.log("loaded locData", locData);

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
                        window.console&&console.log("create infoWindow;", locData, locData._infoWindow);
                        locData._infoWindow = new google.maps.InfoWindow({
                            content: generateInfoWindowContent(loc)
                        });
                        locData._infoWindow.open(mapWrapper.data.map.googleMap, locData._marker);
                        google.maps.event.addListener(locData._infoWindow, 'closeclick', loc.setInactive);
                    }
                } else {
                    // hide not active items
                    if(locData._infoWindow) {
                        window.console&&console.log(loc.id + " had prev infoWindow, closing...", locData._infoWindow);
                        locData._infoWindow.close();
                        locData._infoWindow = undefined;
                    }
                }

                // center & zoom map to show all markers
                bounds.extend(latLng);
            });
            // add own position to shown markers
            if(ownLocation() && ownLocation().getPosition()) {
                bounds.extend(ownLocation().getPosition());
            }
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
