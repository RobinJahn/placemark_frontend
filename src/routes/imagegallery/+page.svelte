<script>
    import {placemarkService} from "../../services/placemark-service.js";
    import {onMount} from "svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import Header from "$lib/Header.svelte";
    import ImageGallery from "./ImageGallery.svelte";

    let categoryAndImages = {};

    onMount(loadPlacemarks);

    async function loadPlacemarks() {
        // get all placemarks
        let placemarks = await placemarkService.getPlacemarks();

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
    }

    function hasImages(categoryAndImages){
      if (Object.keys(categoryAndImages).length === 0){
        return false;
      }
      else{
        let foundImage = false;
        for (let category in categoryAndImages){
          if (categoryAndImages[category].length > 0){
            foundImage = true;
          }
        }
        return foundImage;
      }
    }
</script>


<Header>
    <MainNavigator/>
</Header>


<div class="box">
    {#each Object.keys(categoryAndImages) as category}
        {#if categoryAndImages[category] && categoryAndImages[category].length > 0}
        <section class="box">
                <h1 class="title">{category}</h1>
                <ImageGallery images={categoryAndImages[category]}></ImageGallery>
            </section>
        {/if}
    {/each}
    {#if hasImages(categoryAndImages) === false}
        <div class="has-text-centered">
            <h1 class="title">You haven't uploaded any photos yet</h1>
        </div>
    {/if}
</div>