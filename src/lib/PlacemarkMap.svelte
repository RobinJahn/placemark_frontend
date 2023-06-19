<script>
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map";
    import { onMount } from "svelte";

    const mapConfig = {
        location: { lat: 52.160858, lng: -7.15242 },
        zoom: 8,
        minZoom: 1
    };

    onMount(async () => {
        const map = new LeafletMap("donation-map", mapConfig);
        map.showZoomControl();
        map.showLayerControl();
    });

</script>

<div class="box" id="donation-map" style="height:75vh" />
