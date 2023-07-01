<script>
    import Header from '$lib/Header.svelte';

    import MainNavigator from '$lib/MainNavigator.svelte';
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import PlacemerkForm from "./PlacemerkForm.svelte";
</script>

<Header subTitle="Dashboard">
    <MainNavigator />
</Header>

<div class="columns is-vcentered">
    <div class="column">
        <div class="box">
            <PlacemarkMap setAll={true}/>
        </div>
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Create a new Placemark</h1>
        <PlacemerkForm/>
    </div>
</div>
