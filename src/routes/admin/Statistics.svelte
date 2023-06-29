<script>
    import Chart from "svelte-frappe-charts";
    import {onMount} from "svelte";
    import {placemarkService} from "../../services/placemark-service.js";

    export let type = "user";
    export let title = "New Users per Day";

    let data = {
        labels: ["1"],
        datasets: [
            {
                values: [2]
            }
        ]
    };

    onMount(async () => {
        const newData = await prepareData();
        data = newData; // Set data to the new object.
    });

    async function prepareData() {
        const statistics = await placemarkService.getStatistics(type)
        // get the smallest creationDate over all elements
        const minDate = new Date(statistics.reduce((min, p) => p.creationDate < min ? p.creationDate : min, statistics[0].creationDate));
        //round the timestamp to the day
        minDate.setHours(0,0,0,0);

        // get the biggest creationDate over all elements
        const maxDate = new Date(statistics.reduce((max, p) => p.creationDate > max ? p.creationDate : max, statistics[0].creationDate));
        //round the timestamp to the day
        maxDate.setHours(0,0,0,0);

        const newData = {
            labels: [],
            datasets: [
                {
                    values: []
                }
            ]
        };

        // go over all days between min and max date
        for (let d = minDate; d <= maxDate; d.setDate(d.getDate() + 1)) {
            // get all elements for the current day
            // round the creationDate to the day
            const elements = statistics.filter(e => new Date(e.creationDate).setHours(0,0,0,0) === d.setHours(0,0,0,0));

            newData.labels.push(d.toLocaleDateString());
            newData.datasets[0].values.push(elements.length);
        }

        return newData;
    }
</script>

<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4"> {title}</h1>
        <Chart {data} type="line" />
    </div>
</div>
