<script>
    import "leaflet/dist/leaflet.css";
    import {LeafletMap} from "../services/leaflet-map";
    import {onMount} from "svelte";
    import {placemarkService} from "../services/placemark-service.js";
    import {latestPlacemark} from "../stores.js";

    const mapConfig = {
        location: {lat: 52.160858, lng: -7.15242},
        zoom: 8,
        minZoom: 1
    };
    let map;

    onMount(async () => {
        map = new LeafletMap("placemark-map", mapConfig);
        map.showZoomControl();
        map.addLayerGroup('Placemarks');
        map.showLayerControl();

        const placemarks = await placemarkService.getPlacemarks();
        placemarks.forEach((placemark) => {
            addPlacemarkMarker(map, placemark);
        });
    });

    function addPlacemarkMarker(map, placemark) {
        map.addMarker({lat: placemark.lat, lng: placemark.lng}, placemark.name, "Placemarks");
        map.moveTo(8, { lat: placemark.lat, lng: placemark.lng });
    }

    latestPlacemark.subscribe((placemark) => {
        if (placemark && map) {
            addPlacemarkMarker(map, placemark);
        }
    });
</script>

<div class="box" id="placemark-map" style="height:75vh"/>
