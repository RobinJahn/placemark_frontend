<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import {placemarkService} from "../../../services/placemark-service.js";

    let id;

    onMount(async () => {
        id = $page.params.id;
    });


</script>

<h1>POI ID: {id}</h1>
<div class="columns">
    <div class="column">
        <PlacemarkMap markerId="{id}" setAll={false}/>
    </div>
    <div class="column">
        <p> Hallo </p>
    </div>
</div>
