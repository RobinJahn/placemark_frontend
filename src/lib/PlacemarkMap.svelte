<script>
    import {afterUpdate, onMount} from "svelte";
    import {placemarkService} from "../services/placemark-service.js";
    import {latestPlacemark} from "../stores.js";

    export let id = "placemark-map";
    export let marker;
    export let setAll = false;
    export let height = 70;
    export let showLayer = "Terrain";
    export let zoom = 8;
    export let location;


    const mapConfig = {
        location: location ? location : {lat: 59.3280, lng: 18.0914},
        zoom: zoom,
        minZoom: 1
    };
    let map;

    onMount(load);

    async function load() {
        // Dynamically import leaflet.css
        await import("leaflet/dist/leaflet.css");

        // Dynamically import LeafletMap
        const { LeafletMap } = await import("../services/leaflet-map");

        map = new LeafletMap(id, mapConfig, showLayer);
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

            if (!location || mapConfig.location !== location) {
                map.moveTo(zoom, {lat: lastPlacemark.lat, lng: lastPlacemark.lng});
            }
        }
        if (setAll === false) {
            addPlacemarkMarker(map, marker)
            map.moveTo(zoom, { lat: marker.lat, lng: marker.lng });
        }
    }

    function addPlacemarkMarker(map, placemark) {
        const text = `<a href='/poi/${placemark._id}'> ${placemark.name} <br/> <small>{click for details}</small></a>`;
        map.addMarker({lat: placemark.lat, lng: placemark.lng}, text, "Placemarks");

    }

    latestPlacemark.subscribe((placemark) => {
        if (placemark && map) {
            addPlacemarkMarker(map, placemark);
            map.moveTo(zoom, { lat: placemark.lat, lng: placemark.lng });
        }
    });
</script>

<div class="box" id={id} style="height:{height}vh"/>
