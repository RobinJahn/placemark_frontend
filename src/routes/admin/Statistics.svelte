<script>
    import regression from "regression";
    import Chart from "svelte-frappe-charts";
    import {onMount} from "svelte";
    import {placemarkService} from "../../services/placemark-service.js";

    export let type = "user";
    export let title = "New Users per Day";

    export let chartType = "line";

    const colors = ['#8F00FF', '#d200ff'];

    const emptyData = {
        labels: [],
        datasets: [
            { values: [], },
            { values: [], },
        ],
        yMarkers: [
          {
              label: '',
              value: 0,
              type: 'solid'
          }
        ]
    };

    let data = JSON.parse(JSON.stringify(emptyData));
    let dataForHeatmap = {
        dataPoints: {
        },

        start: new Date(2021, 0, 1),
        end: new Date(2022, 11, 31),
    };

    onMount(load);

    async function load() {
        const newData = await prepareData();

        const newHeatmapData = await prepareHeatmapData(newData);
        dataForHeatmap = newHeatmapData;

        if (newData.labels.length === 0) {
            data = newData;
            return;
        }

        const forecast = await forecastData(newData);

        const combinedData = combineData(newData, forecast, chartType);

        data = combinedData;
    }

    async function prepareData() {
        const statistics = await placemarkService.getStatistics(type)

        if (statistics.length === 0) {
            return JSON.parse(JSON.stringify(emptyData));
        }

        const minDate = new Date(statistics.reduce((min, p) => p.creationDate < min ? p.creationDate : min, statistics[0].creationDate));
        minDate.setHours(0,0,0,0);

        const maxDate = new Date(statistics.reduce((max, p) => p.creationDate > max ? p.creationDate : max, statistics[0].creationDate));
        maxDate.setHours(0,0,0,0);

        const newData = JSON.parse(JSON.stringify(emptyData));

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
            let date = new Date(
              dateComponents[2],
              dateComponents[1] - 1,
              dateComponents[0]);
            newData.dataPoints[
              Math.floor(date.getTime() / 1000)
              ] = data.datasets[0].values[i];
        }

        return newData;
    }

    async function forecastData(data) {
        const rangeOfForecast = Math.min(7, data.datasets[0].values.length);

        // extract data from the past week
        const pastWeekData = data.datasets[0].values.slice(-rangeOfForecast);

        let dataForRegression = [];
        for (let i=0; i<pastWeekData.length; i++) {
            dataForRegression.push([i+1, pastWeekData[i]]);
        }

        let result = regression.linear(dataForRegression);

        let predictions = [];
        for (let i=1; i<=rangeOfForecast*2; i++) {
            let prediction = result.predict(i);
            predictions.push(
              Math.max(prediction[1], 0)
            );
        }

        let nextWeekLabels = [];
        nextWeekLabels = nextWeekLabels.concat(data.labels);

        let dateTokens = data.labels[data.labels.length-1].split(".");
        for (let i=0; i<rangeOfForecast; i++) {
            let date = new Date(
              dateTokens[2],
              dateTokens[1] - 1,
              dateTokens[0]);
            date.setDate(date.getDate() + i + 1);
            nextWeekLabels.push(date.toLocaleDateString());
        }

        const dataToReturn = {
            labels: nextWeekLabels,
            datasets: [
                {
                    values: predictions,
                }
            ],
            yMarkers: [
                {
                    label: '',
                    value: 0,
                    type: 'solid'
                }
            ]
        };

        return dataToReturn;
    }

    function combineData(newData, forecast, chartType) {
        const combinedData = JSON.parse(JSON.stringify(emptyData));
        combinedData.labels = forecast.labels;

        const halfSize = combinedData.labels.length / 2;


        for (let i = 0; i < combinedData.labels.length; i++) {

            if (chartType === "line") {
                if (i < halfSize) {
                    combinedData.datasets[0].values.push(
                      newData.datasets[0].values[i]
                    );
                } else {
                    combinedData.datasets[0].values.push(forecast.datasets[0].values[i]);
                }
                combinedData.datasets[1].values.push(
                  forecast.datasets[0].values[i]
                );
            } else {
                if (i < halfSize) {
                    combinedData.datasets[0].values.push(
                      newData.datasets[0].values[i]
                    );
                    combinedData.datasets[1].values.push(0);
                } else {
                    combinedData.datasets[0].values.push(0);
                    combinedData.datasets[1].values.push(
                      forecast.datasets[0].values[i]
                    );
                }

            }
        }
        return combinedData;
    }

    $: {
        chartType = chartType;
        load();
    }

</script>

<div class="m-3 has-text-centered">
    <h1 class="title is-4"> {title}</h1>
    {#if chartType === "heatmap"}
        {#each [dataForHeatmap] as data (data)}
            <Chart {data} type="heatmap" />
        {/each}
    {:else}
        <Chart data="{data}" colors="{colors}" type={chartType} />
    {/if}
</div>
