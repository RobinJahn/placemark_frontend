<script>
    import {onMount} from "svelte";
    import {placemarkService} from "../services/placemark-service.js";
    import {latestPlacemark} from "../stores.js";

    export let id = "placemark-map";
    export let marker = null;
    export let setAll = false;
    export let height = 70;
    export let showLayer = "Terrain";
    export let zoom = 8;
    export let location = null;


    const mapConfig = {
        location: location ? location : {lat: 59.3280, lng: 18.0914},
        zoom: zoom,
        minZoom: 1
    };
    let map;
    let categories = [];

    onMount(load);

    async function load() {
        // Dynamically import LeafletMap
        const { LeafletMap } = await import("../services/leaflet-map");

        map = new LeafletMap(id, mapConfig, showLayer);
        map.showZoomControl();

        if (setAll === true) {
            const placemarks = await placemarkService.getPlacemarks();

            placemarks.forEach((placemark) => {
                if (!categories.includes(placemark.category)) {
                    categories.push(placemark.category);
                }
            });

            for (let i = 0; i < categories.length; i++) {
                map.addLayerGroup(categories[i]);
            }
            map.showLayerControl();


            placemarks.forEach((placemark) => {
                addPlacemarkMarker(map, placemark);
            });

            const lastPlacemark = placemarks[placemarks.length - 1];
            if (lastPlacemark && !mapConfig.location) {
                map.moveTo(zoom, {lat: lastPlacemark.lat, lng: lastPlacemark.lng});
            }
            else {
                map.moveTo(zoom, mapConfig.location);
            }
        }
        if (setAll === false) {
            addPlacemarkMarker(map, marker);
            map.moveTo(zoom, { lat: marker.lat, lng: marker.lng });
        }
    }

    function addPlacemarkMarker(map, placemark) {
        const text = `<a href='/poi/${placemark._id}'> ${placemark.name} <br/> <small>{click for details}</small></a>`;

        map.addMarker({lat: placemark.lat, lng: placemark.lng}, text, placemark.category);
    }

    latestPlacemark.subscribe((placemark) => {
        if (placemark && map) {
            // if placemark has new category, add it to map
            if (!categories.includes(placemark.category)) {
                map.addLayerGroup(placemark.category);
            }

            addPlacemarkMarker(map, placemark);
            map.moveTo(zoom, { lat: placemark.lat, lng: placemark.lng });
        }
    });
</script>

<div class="box" id={id} style="height:{height}vh"></div>
