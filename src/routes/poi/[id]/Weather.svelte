<script>
  import { weatherService } from "../../../services/weather-service.js";
  import { onMount } from "svelte";

  export let lat = 59.328;
  export let lng = 18.0914;

  let weather = {
    weatherName: "",
    weatherDescription: "",
    temperature: 0,
    windSpeed: 0,
    visibility: 0,
    clouds: 0,
  };

  let attributes = [
    { icon: 'fa-cloud-sun', label: 'Weather', value: weather.weatherDescription },
    { icon: 'fa-temperature-high', label: 'Temperature', value: weather.temperature },
    { icon: 'fa-wind', label: 'Wind Speed', value: weather.windSpeed },
    { icon: 'fa-eye', label: 'Visibility', value: weather.visibility },
    { icon: 'fa-cloud', label: 'Clouds', value: weather.clouds },
  ];

  onMount(async () => {
    weather = await weatherService.getWeather(lat, lng);

    attributes = [
      { icon: 'fa-cloud-sun', label: 'Weather', value: weather.weatherDescription },
      { icon: 'fa-temperature-high', label: 'Temperature', value: weather.temperature },
      { icon: 'fa-wind', label: 'Wind Speed', value: weather.windSpeed },
      { icon: 'fa-eye', label: 'Visibility', value: weather.visibility },
      { icon: 'fa-cloud', label: 'Clouds', value: weather.clouds },
    ];
  });

</script>

<div class="container">
  <div class="columns is-multiline">
    {#each attributes as { icon, label, value }}
      <div class="column is-full">
        <div class="card">
          <div class="card-content">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <i class="fas {icon} fa-lg"></i>
                </div>
                <div class="level-item">
                  <p>{label}: {value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
