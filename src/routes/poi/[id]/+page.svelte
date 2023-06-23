<script>
    import {page} from '$app/stores';
    import {onMount} from 'svelte';
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import {placemarkService} from "../../../services/placemark-service.js";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import Header from "$lib/Header.svelte";
    import {each} from "svelte/internal";

    let id;
    let placemark;
    let user;
    let placemarkLocation;

    let isEditable = false;

    let titleText;
    let descriptionText;

    onMount(load);

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
            placemarkService.updatePlacemark({
                id: placemark.id,
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
                        {#each [placemark] as p (p)}
                            <PlacemarkMap id="street-map" marker={p} setAll={false} zoom={15} height={50}/>
                        {/each}
                    </div>
                    <div class="column is-half">
                        {#each [placemark] as p (p)}
                            <PlacemarkMap id="satellite-map" marker={p} setAll={false} zoom={15} height={50}
                                          showLayer="Satellite"/>
                        {/each}
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-half">
                        {#each [placemark] as p (p)}
                            <PlacemarkMap id="all-marker-map" setAll={true} height={50} location={placemarkLocation}/>
                        {/each}
                    </div>
                    <div class="column">
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

                        <!-- for each placemark.img as img -->
                        {#each placemark.image_list as img}
                            <figure class="image is-256x256">
                                <img src={img} alt="">
                            </figure>
                        {/each}

                        <!--figure class="image is-256x256">
                            <img src={placemark.image_list?.[0]} alt="">
                        </figure-->

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
    {/if}
</div>