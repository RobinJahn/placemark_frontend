<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import UserList from "./UserList.svelte";
    import Statistics from "./Statistics.svelte";


</script>

<Header>
    <MainNavigator />
</Header>

<UserList />

<Statistics id="NewUserData" type="user" title="New Users per Day"/>

<Statistics id="NewPlacemarksData" type="placemark"  title="New Placemarks per Day"/>

