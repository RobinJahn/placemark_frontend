import { c as create_ssr_component, b as each, e as escape, o as onDestroy, d as add_attribute, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainNavigator } from "../../../chunks/MainNavigator.js";
import regression from "regression";
import "frappe-charts";
import { p as placemarkService } from "../../../chunks/placemark-service.js";
const UserList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let users = [];
  return `


${`<div class="box"><h1 class="title has-text-centered">Users</h1>
        <table class="table is-fullwidth is-hoverable m-3"><thead><tr><th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Actions</th></tr></thead>
            <tbody>${each(users, (user) => {
    return `<tr><td>${escape(user.firstName)}</td>
                    <td>${escape(user.lastName)}</td>
                    <td>${escape(user.email)}</td>
                    <td><button class="button is-danger">Delete</button></td>
                </tr>`;
  })}</tbody></table></div>`}`;
});
const Base = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = {
    labels: [],
    datasets: [{ values: [] }],
    yMarkers: {},
    yRegions: []
  } } = $$props;
  let { title = "" } = $$props;
  let { type = "line" } = $$props;
  let { height = 300 } = $$props;
  let { animate = true } = $$props;
  let { axisOptions = {} } = $$props;
  let { barOptions = {} } = $$props;
  let { lineOptions = {} } = $$props;
  let { tooltipOptions = {} } = $$props;
  let { colors = [] } = $$props;
  let { valuesOverPoints = 0 } = $$props;
  let { isNavigable = false } = $$props;
  let { maxSlices = 3 } = $$props;
  let chart = null;
  let chartRef;
  function ifChartThen(fn) {
    return function ifChart(...args) {
      if (chart) {
        return fn(...args);
      }
    };
  }
  const addDataPoint = ifChartThen((label, valueFromEachDataset, index) => chart.addDataPoint(label, valueFromEachDataset, index));
  const removeDataPoint = ifChartThen((index) => chart.removeDataPoint(index));
  const exportChart = ifChartThen(() => chart.export());
  const updateChart = ifChartThen((newData) => chart.update(newData));
  onDestroy(() => {
    chart = null;
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.animate === void 0 && $$bindings.animate && animate !== void 0)
    $$bindings.animate(animate);
  if ($$props.axisOptions === void 0 && $$bindings.axisOptions && axisOptions !== void 0)
    $$bindings.axisOptions(axisOptions);
  if ($$props.barOptions === void 0 && $$bindings.barOptions && barOptions !== void 0)
    $$bindings.barOptions(barOptions);
  if ($$props.lineOptions === void 0 && $$bindings.lineOptions && lineOptions !== void 0)
    $$bindings.lineOptions(lineOptions);
  if ($$props.tooltipOptions === void 0 && $$bindings.tooltipOptions && tooltipOptions !== void 0)
    $$bindings.tooltipOptions(tooltipOptions);
  if ($$props.colors === void 0 && $$bindings.colors && colors !== void 0)
    $$bindings.colors(colors);
  if ($$props.valuesOverPoints === void 0 && $$bindings.valuesOverPoints && valuesOverPoints !== void 0)
    $$bindings.valuesOverPoints(valuesOverPoints);
  if ($$props.isNavigable === void 0 && $$bindings.isNavigable && isNavigable !== void 0)
    $$bindings.isNavigable(isNavigable);
  if ($$props.maxSlices === void 0 && $$bindings.maxSlices && maxSlices !== void 0)
    $$bindings.maxSlices(maxSlices);
  if ($$props.addDataPoint === void 0 && $$bindings.addDataPoint && addDataPoint !== void 0)
    $$bindings.addDataPoint(addDataPoint);
  if ($$props.removeDataPoint === void 0 && $$bindings.removeDataPoint && removeDataPoint !== void 0)
    $$bindings.removeDataPoint(removeDataPoint);
  if ($$props.exportChart === void 0 && $$bindings.exportChart && exportChart !== void 0)
    $$bindings.exportChart(exportChart);
  {
    updateChart(data);
  }
  return `<div${add_attribute("this", chartRef, 0)}></div>`;
});
const Base$1 = Base;
async function prepareHeatmapData(data) {
  const newData = {
    dataPoints: {},
    start: new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1),
    end: new Date((/* @__PURE__ */ new Date()).getFullYear(), 11, 31)
  };
  for (let i = 0; i < data.labels.length; i++) {
    let dateComponents = data.labels[i].split(".");
    let date = new Date(dateComponents[2], dateComponents[1] - 1, dateComponents[0]);
    newData.dataPoints[Math.floor(date.getTime() / 1e3)] = data.datasets[0].values[i];
  }
  return newData;
}
const Statistics = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "user" } = $$props;
  let { title = "New Users per Day" } = $$props;
  let { chartType = "line" } = $$props;
  const colors = ["#8F00FF", "#d200ff"];
  const emptyData = {
    labels: [],
    datasets: [{ values: [] }, { values: [] }],
    yMarkers: [{ label: "", value: 0, type: "solid" }]
  };
  let data = JSON.parse(JSON.stringify(emptyData));
  let dataForHeatmap = {
    dataPoints: {},
    start: new Date(2021, 0, 1),
    end: new Date(2022, 11, 31)
  };
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
    const statistics = await placemarkService.getStatistics(type);
    if (statistics.length === 0) {
      return JSON.parse(JSON.stringify(emptyData));
    }
    const minDate = new Date(statistics.reduce((min, p) => p.creationDate < min ? p.creationDate : min, statistics[0].creationDate));
    minDate.setHours(0, 0, 0, 0);
    const maxDate = new Date(statistics.reduce((max, p) => p.creationDate > max ? p.creationDate : max, statistics[0].creationDate));
    maxDate.setHours(0, 0, 0, 0);
    const newData = JSON.parse(JSON.stringify(emptyData));
    for (let d = minDate; d <= maxDate; d.setDate(d.getDate() + 1)) {
      const elements = statistics.filter((e) => new Date(e.creationDate).setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0));
      newData.labels.push(d.toLocaleDateString());
      newData.datasets[0].values.push(elements.length);
    }
    return newData;
  }
  async function forecastData(data2) {
    const rangeOfForecast = Math.min(7, data2.datasets[0].values.length);
    const pastWeekData = data2.datasets[0].values.slice(-rangeOfForecast);
    let dataForRegression = [];
    for (let i = 0; i < pastWeekData.length; i++) {
      dataForRegression.push([i + 1, pastWeekData[i]]);
    }
    let result = regression.linear(dataForRegression);
    let predictions = [];
    for (let i = 1; i <= rangeOfForecast * 2; i++) {
      let prediction = result.predict(i);
      predictions.push(Math.max(prediction[1], 0));
    }
    let nextWeekLabels = [];
    nextWeekLabels = nextWeekLabels.concat(data2.labels);
    let dateTokens = data2.labels[data2.labels.length - 1].split(".");
    for (let i = 0; i < rangeOfForecast; i++) {
      let date = new Date(dateTokens[2], dateTokens[1] - 1, dateTokens[0]);
      date.setDate(date.getDate() + i + 1);
      nextWeekLabels.push(date.toLocaleDateString());
    }
    const dataToReturn = {
      labels: nextWeekLabels,
      datasets: [{ values: predictions }],
      yMarkers: [{ label: "", value: 0, type: "solid" }]
    };
    return dataToReturn;
  }
  function combineData(newData, forecast, chartType2) {
    const combinedData = JSON.parse(JSON.stringify(emptyData));
    combinedData.labels = forecast.labels;
    const halfSize = combinedData.labels.length / 2;
    for (let i = 0; i < combinedData.labels.length; i++) {
      if (chartType2 === "line") {
        if (i < halfSize) {
          combinedData.datasets[0].values.push(newData.datasets[0].values[i]);
        } else {
          combinedData.datasets[0].values.push(forecast.datasets[0].values[i]);
        }
        combinedData.datasets[1].values.push(forecast.datasets[0].values[i]);
      } else {
        if (i < halfSize) {
          combinedData.datasets[0].values.push(newData.datasets[0].values[i]);
          combinedData.datasets[1].values.push(0);
        } else {
          combinedData.datasets[0].values.push(0);
          combinedData.datasets[1].values.push(forecast.datasets[0].values[i]);
        }
      }
    }
    return combinedData;
  }
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.chartType === void 0 && $$bindings.chartType && chartType !== void 0)
    $$bindings.chartType(chartType);
  {
    {
      chartType = chartType;
      load();
    }
  }
  return `<div class="m-3 has-text-centered"><h1 class="title is-4">${escape(title)}</h1>
    ${chartType === "heatmap" ? `${each([dataForHeatmap], (data2) => {
    return `${validate_component(Base$1, "Chart").$$render($$result, { data: data2, type: "heatmap" }, {}, {})}`;
  })}` : `${validate_component(Base$1, "Chart").$$render($$result, { data, colors, type: chartType }, {}, {})}`}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalUsers = 0;
  let totalPlacemarks = 0;
  let chartType = "line";
  let chartTypeSelected = chartType;
  let chartTypes = ["line", "bar", "heatmap"];
  const colors = ["#8F00FF", "#d200ff"];
  let labels = ["Factual Data", "Forecast"];
  {
    if (chartTypeSelected) {
      chartType = chartTypeSelected;
    }
  }
  return `${validate_component(Header, "Header").$$render($$result, { subTitle: "Statistics" }, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="box"><h1 class="title is-3">Statistics</h1>
    <div class="columns is-multiline is-vcentered"><div class="column is-one-quarter"><h1 class="subtitle is-5">Select Chart Type</h1></div>

        <div class="field column"><div class="control"><div class="select is-fullwidth"><select><option disabled selected value="">Select an item</option>${each(chartTypes, (item) => {
    return `<option${add_attribute("value", item, 0)}>${escape(item)}</option>`;
  })}</select></div></div></div></div>
    ${chartType !== "heatmap" ? `<div class="m-3"><h1 class="title is-4">Legend:</h1>
            <div class="columns">${each(colors, (color, i) => {
    return `<div class="column is-narrow"><div class="level"><div class="level-left"><div class="level-item"><i class="fas fa-circle fa-lg" style="${"color: " + escape(color, true) + ";"}"></i></div>
                                <div class="level-item"><p>${escape(labels[i])}</p></div>
                            </div></div>
                    </div>`;
  })}</div></div>` : ``}</div>

${chartType === "heatmap" ? `<div class="box has-text-centered is-full-width">${validate_component(Statistics, "Statistics").$$render(
    $$result,
    {
      type: "user",
      title: "New Users per Day",
      chartType
    },
    {},
    {}
  )}

            <h1 class="title is-5 my-3">Total Users: ${escape(totalUsers)}</h1></div>
        <div class="box has-text-centered">${validate_component(Statistics, "Statistics").$$render(
    $$result,
    {
      type: "placemark",
      title: "New Placemarks per Day",
      chartType
    },
    {},
    {}
  )}

            <h1 class="title is-5 my-3">Total Placemarks: ${escape(totalPlacemarks)}</h1></div>` : `<div class="columns is-multiline"><div class="column is-half-desktop is-full-tablet"><div class="box has-text-centered">${validate_component(Statistics, "Statistics").$$render(
    $$result,
    {
      type: "user",
      title: "New Users per Day",
      chartType
    },
    {},
    {}
  )}

                    <h1 class="title is-5 my-3">Total Users: ${escape(totalUsers)}</h1></div></div>
            <div class="column has-text-centered is-half-desktop is-full-tablet"><div class="box has-text-centered">${validate_component(Statistics, "Statistics").$$render(
    $$result,
    {
      type: "placemark",
      title: "New Placemarks per Day",
      chartType
    },
    {},
    {}
  )}

                    <h1 class="title is-5 my-3">Total Placemarks: ${escape(totalPlacemarks)}</h1></div></div></div>`}
    <div class="box">${validate_component(Statistics, "Statistics").$$render($$result, { type: "login", title: "Usage", chartType }, {}, {})}</div>

${validate_component(UserList, "UserList").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
