<script>
    import {page} from '$app/stores';
    import {onDestroy, onMount} from 'svelte';
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import {placemarkService} from "../../../services/placemark-service.js";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import Header from "$lib/Header.svelte";
    import ImageSelect from "$lib/ImageSelect.svelte";
    import {imageUploadSuccessful} from "../../../stores.js";
    import {get} from "svelte/store";

    let id;
    let placemark;
    let user;
    let placemarkLocation;

    let isEditable = false;

    let titleText;
    let descriptionText;

    let showMessageImageUploadStatus = false;
    let imageUploadSuccess = false;

    onMount(load);

    let unsubscribe = imageUploadSuccessful.subscribe(value => {
        if (value) {
            if (value.success === false) {
                imageUploadSuccess = false;
            }
            else {
                placemark = get(imageUploadSuccessful);
                imageUploadSuccess = true;
            }
            imageUploadSuccessful.set(null);
            showMessageImageUploadStatus = true;
            setTimeout(() => {
                showMessageImageUploadStatus = false;
            }, 5000);
        }
    });

    onDestroy(() => {
        unsubscribe();
    });

    async function load() {
        id = $page.params.id;
        isEditable = false;

        placemark = await placemarkService.getPlacemark(id);
        placemarkLocation = {lat: placemark.lat, lng: placemark.lng};
        titleText = placemark.name;
        descriptionText = placemark.description;

        user = await placemarkService.getUser(placemark.user);
    }

    function toggleEditable() {
        isEditable = !isEditable;
        //first make it not editable, then update the placemark

        if (!isEditable) {
            placemark.name = titleText;
            placemark.description = descriptionText;
            placemarkService.updatePlacemark(id , {
                name: placemark.name,
                description: placemark.description
            });
        }
    }

    function updateTitleValue(event) {
        titleText = event.target.textContent;
    }

    function updateDescriptionValue(event) {
        descriptionText = event.target.textContent;
    }

    async function deleteImage(img) {
        let result = await placemarkService.deleteImage(placemark._id, img);
        if (result) {
            placemark = result;
        }
    }

    $: {
        let reloadID = $page.params.id;
        if (reloadID !== id) {
            load();
        }
    }
</script>


<Header>
    <MainNavigator/>
</Header>

<div class="card box m-2">
    {#if placemark && user}
        {#each [placemark] as p (p)}
            <header class="card-header">
                <p class="card-header-title is-size-3 has-text-centered is-centered" contenteditable={isEditable}
                   on:input={updateTitleValue}>
                    {titleText}
                </p>

                <button class="button my-auto mr-3" on:click={toggleEditable}>
                    {#if isEditable}
                        <i class="fas fa-save fa-lg"></i>
                    {:else}
                        <i class="fas fa-edit fa-lg"></i>
                    {/if}
                </button>
            </header>

            <div class="card-content">

                <div class="content">
                    <div class="columns">
                        <div class="column">
                            <PlacemarkMap id="street-map" marker={p} setAll={false} zoom={15} height={50}/>
                        </div>
                        <div class="column is-half">
                            <PlacemarkMap id="satellite-map" marker={p} setAll={false} zoom={15} height={50} showLayer="Satellite"/>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-half">
                            <PlacemarkMap id="all-marker-map" setAll={true} height={50} location={placemarkLocation}/>
                        </div>
                        <div class="column is-half">
                            <p contenteditable={isEditable} on:input={updateDescriptionValue}> {descriptionText} </p>
                            <br/>
                            <table class="table is-fullwidth">
                                <tbody>
                                <tr>
                                    <td>Owner</td>
                                    <td>{user.firstName + user.lastName}</td>
                                </tr>
                                <tr>
                                    <td>e-Mail</td>
                                    <td>{user.email}</td>
                                </tr>
                                </tbody>
                            </table>

                            {#if isEditable}
                                <ImageSelect fileName="Select a File" showMessageImageUploadStatus={showMessageImageUploadStatus} imageUploadSuccess={imageUploadSuccess}/>
                            {/if}

                            {#each p.image_list as img}
                                {#if isEditable}
                                    <div class="card my-3 py-3">
                                        <div class="card-image">
                                            <figure class="image is-256x256">
                                                <img src={img} alt="">
                                            </figure>
                                        </div>
                                        <div class="card-content">
                                            <button class="button is-danger ml-2" on:click={() => deleteImage(img)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                {/if}
                                {#if !isEditable}
                                    <figure class="image is-256x256">
                                        <img src={img} alt="">
                                    </figure>
                                {/if}
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

        {:else}
            <div class="card-content">
                <div class="content">
                    <p class="has-text-centered is-size-3">Loading...</p>
                </div>
            </div>
        {/each}
    {/if}
</div>