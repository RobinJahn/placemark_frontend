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

    onMount(async () => {
        id = $page.params.id;
        placemark = await placemarkService.getPlacemark(id);
        user = await placemarkService.getUser(placemark.user);
        console.log(placemark)
        console.log(user)
    });


</script>


<Header>
    <MainNavigator/>
</Header>

<div class="card box m-2">
    {#if placemark && user}
        <header class="card-header">
            <p class="card-header-title is-size-3 has-text-centered is-centered">
                {placemark.name}
            </p>
        </header>

        <div class="card-content">

            <div class="content">
                <div class="columns">
                    <div class="column">
                        <PlacemarkMap marker={placemark} setAll={false}/>
                    </div>
                    <div class="column">
                        <p> {placemark.description} </p>
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