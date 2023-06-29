<script>
    import Chart from "svelte-frappe-charts";
    import {onMount} from "svelte";
    import {placemarkService} from "../../services/placemark-service.js";

    export let type = "user";
    export let title = "New Users per Day";

    export let chartType = "line";

    let data = {
        labels: ["1"],
        datasets: [
            {
                values: [2],
            }
        ],

    };

    let dataForHeatmap = {
        dataPoints: {
        },

        start: new Date(2021, 0, 1),
        end: new Date(2022, 11, 31),
    };

    onMount(async () => {
        const newData = await prepareData();
        data = newData; // Set data to the new object.

        const newHeatmapData = await prepareHeatmapData(data);
        dataForHeatmap = newHeatmapData;
    });

    async function prepareData() {
        const statistics = await placemarkService.getStatistics(type)

        if (statistics.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        values: []
                    }
                ]
            };
        }

        const minDate = new Date(statistics.reduce((min, p) => p.creationDate < min ? p.creationDate : min, statistics[0].creationDate));
        minDate.setHours(0,0,0,0);

        const maxDate = new Date(statistics.reduce((max, p) => p.creationDate > max ? p.creationDate : max, statistics[0].creationDate));
        maxDate.setHours(0,0,0,0);

        const newData = {
            labels: [],
            datasets: [
                {
                    values: []
                }
            ]
        };

        for (let d = minDate; d <= maxDate; d.setDate(d.getDate() + 1)) {
            const elements = statistics.filter(e => new Date(e.creationDate).setHours(0,0,0,0) === d.setHours(0,0,0,0));

            newData.labels.push(d.toLocaleDateString());
            newData.datasets[0].values.push(elements.length);
        }

        return newData;
    }

    async function prepareHeatmapData(data) {
        const newData = {
            dataPoints: {
            },

            start: new Date(new Date().getFullYear(), 0, 1),
            end: new Date(new Date().getFullYear(), 11, 31),
        };

        for (let i = 0; i < data.labels.length; i++) {
            let dateComponents = data.labels[i].split(".");
            let date = new Date(dateComponents[2], dateComponents[1] - 1, dateComponents[0]);
            newData.dataPoints[
              Math.floor(date.getTime() / 1000)
              ] = data.datasets[0].values[i];
        }

        return newData;
    }

    $: {
        chartType = chartType;
    }

</script>

<div class="m-3 has-text-centered">
    <h1 class="title is-4"> {title}</h1>
    {#if chartType === "heatmap"}
        {#each [dataForHeatmap] as data (data)}
            <Chart {data} type="heatmap" />
        {/each}
    {:else}
        <Chart {data} type={chartType} />
    {/if}
</div>
