<script>
    import {onMount} from "svelte";
    import {placemarkService} from "../services/placemark-service.js";
    import {latestPlacemark} from "../stores.js";

    export let markerId;
    export let setAll = false;

    const mapConfig = {
        location: {lat: 52.160858, lng: -7.15242},
        zoom: 8,
        minZoom: 1
    };
    let map;
    const nearZoomFactor = 15;
    const farZoomFactor = 8;

    onMount(async () => {
        // Dynamically import leaflet.css
        await import("leaflet/dist/leaflet.css");

        // Dynamically import LeafletMap
        const { LeafletMap } = await import("../services/leaflet-map");

        map = new LeafletMap("placemark-map", mapConfig);
        map.showZoomControl();
        map.addLayerGroup('Placemarks');
        map.showLayerControl();

        if (setAll === true) {
            const placemarks = await placemarkService.getPlacemarks();
            placemarks.forEach((placemark) => {
                addPlacemarkMarker(map, placemark);
            });
            // get last placemark
            const lastPlacemark = placemarks[placemarks.length - 1];
            map.moveTo(farZoomFactor, { lat: lastPlacemark.lat, lng: lastPlacemark.lng });
        }
        if (setAll === false) {
            //await a value in marker
            const marker = await placemarkService.getPlacemark(markerId);
            addPlacemarkMarker(map, marker)
            map.moveTo(nearZoomFactor, { lat: marker.lat, lng: marker.lng });
        }
    });

    function addPlacemarkMarker(map, placemark) {
        const text = `<a href='/poi/${placemark._id}'> ${placemark.name} <small>{click for details}</small></a>`;
        map.addMarker({lat: placemark.lat, lng: placemark.lng}, text, "Placemarks");

    }

    latestPlacemark.subscribe((placemark) => {
        if (placemark && map) {
            addPlacemarkMarker(map, placemark);
            map.moveTo(farZoomFactor, { lat: placemark.lat, lng: placemark.lng });
        }
    });
</script>

<div class="box" id="placemark-map" style="height:75vh"/>
