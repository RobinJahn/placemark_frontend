<script>
    import {page} from '$app/stores';
    import {onMount} from 'svelte';
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import {placemarkService} from "../../../services/placemark-service.js";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import Header from "$lib/Header.svelte";
    import TitleBar from "$lib/TitleBar.svelte";

    let id;
    let placemark;
    let user;
    let placemarkLocation;

    let isEditable = false;

    let titleText;
    let descriptionText;

    onMount(async () => {
        id = $page.params.id;

        placemark = await placemarkService.getPlacemark(id);
        placemarkLocation = {lat: placemark.lat, lng: placemark.lng};
        titleText = placemark.name;
        descriptionText = placemark.description;

        user = await placemarkService.getUser(placemark.user);
    });

    function toggleEditable() {
        isEditable = !isEditable;

        //first make it not editable, then update the placemark
        if (!isEditable) {
            placemark.name = titleText;
            placemark.description = descriptionText;
            placemarkService.updatePlacemark(placemark);
        }
    }

    function updateTitleValue(event) {
        titleText = event.target.textContent;
    }

    function updateDescriptionValue(event) {
        descriptionText = event.target.textContent;
    }
</script>


<Header>
    <MainNavigator/>
</Header>

<div class="card box m-2">
    {#if placemark && user}
        <header class="card-header">
            <p class="card-header-title is-size-3 has-text-centered is-centered" contenteditable={isEditable} on:input={updateTitleValue}>
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
                        <PlacemarkMap id="street-map" marker={placemark} setAll={false} zoom={15} height={50}/>
                    </div>
                    <div class="column is-half">
                        <PlacemarkMap id="satellite-map" marker={placemark} setAll={false} zoom={15} height={50}
                                      showLayer="Satellite"/>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-half">
                        <PlacemarkMap id="all-marker-map" setAll={true} height={50} location={placemarkLocation}/>
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