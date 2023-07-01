<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";

</script>

<Header subTitle="Map">
    <MainNavigator />
</Header>

<div class="box">
    <PlacemarkMap setAll={true}/>
</div>