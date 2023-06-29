<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import UserList from "./UserList.svelte";
    import Statistics from "./Statistics.svelte";
    import {onMount} from "svelte";
    import {placemarkService} from "../../services/placemark-service.js";

    let totalUsers = 0;
    let totalPlacemarks = 0;

    onMount( async () => {
        totalUsers = (await placemarkService.getPlacemarks()).length;
        totalPlacemarks = (await placemarkService.getPlacemarks()).length;
    });

</script>

<Header>
    <MainNavigator />
</Header>


<div class="columns">
    <div class="column box m-3 has-text-centered">
        <Statistics id="NewUserData" type="user" title="New Users per Day"/>
        <h1 class="title is-5 my-3">Total Users: {totalUsers}</h1>
    </div>
    <div class="column box m-3  has-text-centered">
        <Statistics id="NewPlacemarksData" type="placemark"  title="New Placemarks per Day"/>
        <h1 class="title is-5 my-3">Total Placemarks: {totalPlacemarks}</h1>
    </div>
</div>

<UserList />



