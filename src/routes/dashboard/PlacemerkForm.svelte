<script>
    import { onMount } from "svelte";
    import Coordinates from "./Coordinates.svelte";
    import { placemarkService} from "../../services/placemark-service.js";

    let name = "";
    let lat = 59.328;
    let lng = 18.0914;

    let message = "Create a new Placemark";

    async function createPlacemerk() {
        if (name && lat && lng) {
            const placemark = {
                name: name,
                lat: lat,
                lng: lng,
                description: "Enter a description here!",
                image_list: [],
            };
            const success = await placemarkService.createPlacemark(placemark)
            if (!success) {
                message = "Creation of placemark not completed - some error occurred";
                return;
            }
            message = `Thanks! You have created a new placemark called ${name} at ${lat},${lng}`;
        } else {
            message = "Please enter a name and coordinates";
        }
    }
</script>

<form on:submit|preventDefault={createPlacemerk}>
    <div class="field">
        <label class="label" for="name">Enter Name</label>
        <input bind:value={name} class="input" id="name" name="name" type="text" />
    </div>
    <Coordinates bind:lat bind:lng />
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Create</button>
        </div>
    </div>
    <div class="box">
        {message}
    </div>
</form>
