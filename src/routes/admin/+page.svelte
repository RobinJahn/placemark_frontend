<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import UserList from "./UserList.svelte";
    import Statistics from "./Statistics.svelte";
    import {onMount} from "svelte";
    import {placemarkService} from "../../services/placemark-service.js";

    let totalUsers = 0;
    let totalPlacemarks = 0;

    let chartType = "line";
    let chartTypeSelected = chartType;
    let chartTypes = ["line", "bar", "heatmap"];
    const colors = ['#8F00FF', '#d200ff'];
    let labels = ['Factual Data', 'Forecast'];

    onMount( async () => {
        totalUsers = (await placemarkService.getPlacemarks()).length;
        totalPlacemarks = (await placemarkService.getPlacemarks()).length;
    });

    $: if (chartTypeSelected) {
        chartType = chartTypeSelected;
    }

</script>

<Header subTitle="Statistics">
    <MainNavigator />
</Header>

<div class="box">
    <h1 class="title is-3">Statistics</h1>
    <div class="columns is-multiline is-vcentered">
        <div class="column is-one-quarter">
            <h1 class="subtitle is-5">Select Chart Type</h1>
        </div>

        <div class="field column">
            <div class="control">
                <div class="select is-fullwidth">
                    <select bind:value={chartTypeSelected}>
                        <option disabled selected value="">Select an item</option>
                        {#each chartTypes as item (item)}
                            <option>{item}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    </div>
    {#if chartType !== "heatmap"}
        <div class="m-3">
            <h1 class="title is-4">Legend:</h1>
            <div class="columns">
                {#each colors as color, i}
                    <div class="column is-narrow">
                        <div class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <i class="fas fa-circle fa-lg" style="color: {color};"></i>
                                </div>
                                <div class="level-item">
                                    <p>{labels[i]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

{#key chartType}
    {#if chartType === "heatmap"}
        <div class="box has-text-centered is-full-width">
            <Statistics type="user" title="New Users per Day" chartType={chartType}/>

            <h1 class="title is-5 my-3">Total Users: {totalUsers}</h1>
        </div>
        <div class="box has-text-centered">
            <Statistics type="placemark"  title="New Placemarks per Day" chartType={chartType}/>

            <h1 class="title is-5 my-3">Total Placemarks: {totalPlacemarks}</h1>
        </div>
    {:else}
        <div class="columns is-multiline">
            <div class="column is-half-desktop is-full-tablet">
                <div class="box has-text-centered">
                    <Statistics type="user" title="New Users per Day" chartType={chartType}/>

                    <h1 class="title is-5 my-3">Total Users: {totalUsers}</h1>
                </div>
            </div>
            <div class="column has-text-centered is-half-desktop is-full-tablet">
                <div class="box has-text-centered">
                    <Statistics type="placemark"  title="New Placemarks per Day" chartType={chartType}/>

                    <h1 class="title is-5 my-3">Total Placemarks: {totalPlacemarks}</h1>
                </div>
            </div>
        </div>
    {/if}
    <div class="box">
        <Statistics type="login"  title="Usage" chartType={chartType}/>
    </div>
{/key}

<UserList />



