<script>
    import {placemarkService} from "../../services/placemark-service.js";
    import {onMount} from "svelte";

    let categoryAndImages = {};

    onMount(loadPlacemarks);

    async function loadPlacemarks() {
        // get all placemarks
        let placemarks = await placemarkService.getPlacemarks();
        console.log(placemarks);

        for (let placemark of placemarks) {
            // create list if not exists
            if (!categoryAndImages[placemark.category]) {
                categoryAndImages[placemark.category] = [];
            }
            // add all images in placemark.image_list to categoryAndImages
            for (let image of placemark.image_list) {
                categoryAndImages[placemark.category].push(image);
            }
        }

        console.log(categoryAndImages);
    }
</script>

<!-- show all Images per category with bulma -->
<div class="box">
    {#each Object.keys(categoryAndImages) as category}
        <div class="columns">
            <div class="column">
                <h1 class="title">{category}</h1>
            </div>

            <div class="column">
                <div class="columns is-multiline">
                    {#each categoryAndImages[category] as image}
                    <div class="column is-one-quarter">
                        <img src={image} alt="image" class="image is-full-size">
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</div>