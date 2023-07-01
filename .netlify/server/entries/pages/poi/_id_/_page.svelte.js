import { c as create_ssr_component, a as subscribe, e as escape, b as each, g as get_store_value, o as onDestroy, v as validate_component, d as add_attribute } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as PlacemarkMap } from "../../../../chunks/PlacemarkMap.js";
import { p as placemarkService } from "../../../../chunks/placemark-service.js";
import { M as MainNavigator } from "../../../../chunks/MainNavigator.js";
import { H as Header } from "../../../../chunks/Header.js";
import { i as imageUploadSuccessful } from "../../../../chunks/stores2.js";
const ImageSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { fileName = "Image Name" } = $$props;
  let { showMessageImageUploadStatus = false } = $$props;
  let { imageUploadSuccess } = $$props;
  if ($$props.fileName === void 0 && $$bindings.fileName && fileName !== void 0)
    $$bindings.fileName(fileName);
  if ($$props.showMessageImageUploadStatus === void 0 && $$bindings.showMessageImageUploadStatus && showMessageImageUploadStatus !== void 0)
    $$bindings.showMessageImageUploadStatus(showMessageImageUploadStatus);
  if ($$props.imageUploadSuccess === void 0 && $$bindings.imageUploadSuccess && imageUploadSuccess !== void 0)
    $$bindings.imageUploadSuccess(imageUploadSuccess);
  $$unsubscribe_page();
  return `<div class="box p-3">${showMessageImageUploadStatus ? `${imageUploadSuccess ? `<div class="notification is-success"><button class="delete"></button>
                Image uploaded successfully!
            </div>` : `<div class="notification is-danger"><button class="delete"></button>
                Image upload failed!
            </div>`}` : ``}

    ${``}

    <div class="file has-name is-fullwidth"><label class="file-label"><input class="file-input" name="resume" type="file" accept="image/png, image/jpeg">
            <span class="file-cta"><span class="file-icon"><i class="fas fa-upload"></i></span>
                <span class="file-label">Choose a file…
                </span></span>
            <span class="file-name limited-file-name">${escape(fileName)}</span></label></div></div>`;
});
const Weather = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { lat = 59.328 } = $$props;
  let { lng = 18.0914 } = $$props;
  let weather = {
    weatherName: "",
    weatherDescription: "",
    temperature: 0,
    windSpeed: 0,
    visibility: 0,
    clouds: 0
  };
  let attributes = [
    {
      icon: "fa-cloud-sun",
      label: "Weather",
      value: weather.weatherDescription
    },
    {
      icon: "fa-temperature-high",
      label: "Temperature",
      value: weather.temperature
    },
    {
      icon: "fa-wind",
      label: "Wind Speed",
      value: weather.windSpeed
    },
    {
      icon: "fa-eye",
      label: "Visibility",
      value: weather.visibility
    },
    {
      icon: "fa-cloud",
      label: "Clouds",
      value: weather.clouds
    }
  ];
  if ($$props.lat === void 0 && $$bindings.lat && lat !== void 0)
    $$bindings.lat(lat);
  if ($$props.lng === void 0 && $$bindings.lng && lng !== void 0)
    $$bindings.lng(lng);
  return `<div class="container"><div class="columns is-multiline">${each(attributes, ({ icon, label, value }) => {
    return `<div class="column is-full"><div class="card"><div class="card-content"><div class="level"><div class="level-left"><div class="level-item"><i class="${"fas " + escape(icon, true) + " fa-lg"}"></i></div>
                <div class="level-item"><p>${escape(label)}: ${escape(value)}</p></div>
              </div></div>
          </div></div>
      </div>`;
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let id;
  let placemark;
  let placemarkLocation;
  let isEditable = false;
  let editableValuesList = {
    "title": null,
    "description": null,
    "category": null,
    "lat": null,
    "lng": null
  };
  let showMessageImageUploadStatus = false;
  let imageUploadSuccess = false;
  let unsubscribe = imageUploadSuccessful.subscribe((value) => {
    if (value) {
      if (value.success === false) {
        imageUploadSuccess = false;
      } else {
        placemark = get_store_value(imageUploadSuccessful);
        imageUploadSuccess = true;
      }
      imageUploadSuccessful.set(null);
      showMessageImageUploadStatus = true;
      setTimeout(
        () => {
          showMessageImageUploadStatus = false;
        },
        5e3
      );
    }
  });
  onDestroy(() => {
    unsubscribe();
  });
  async function load() {
    id = $page.params.id;
    isEditable = false;
    placemark = await placemarkService.getPlacemark(id);
    placemarkLocation = { lat: placemark.lat, lng: placemark.lng };
    editableValuesList["title"] = placemark.name;
    editableValuesList["description"] = placemark.description;
    editableValuesList["category"] = placemark.category;
    editableValuesList["lat"] = placemark.lat;
    editableValuesList["lng"] = placemark.lng;
  }
  {
    {
      let reloadID = $page.params.id;
      if (reloadID !== id) {
        load();
      }
    }
  }
  $$unsubscribe_page();
  return `${validate_component(Header, "Header").$$render($$result, { subTitle: "Placemark" }, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="card box m-2">${placemark ? `${each([placemark], (p) => {
    return `<header class="card-header"><p id="title" class="card-header-title is-size-3 has-text-centered is-centered"${add_attribute("contenteditable", isEditable, 0)}>${escape(editableValuesList["title"])}</p>

                ${isEditable ? `<button class="button my-auto mr-3 is-danger">Delete Placemark
                    </button>` : ``}

                <button class="button my-auto mr-3">${isEditable ? `<i class="fas fa-save fa-lg"></i>` : `<i class="fas fa-edit fa-lg"></i>`}
                </button></header>

            <div class="card-content"><div class="content"><div class="columns"><div class="column">${validate_component(PlacemarkMap, "PlacemarkMap").$$render(
      $$result,
      {
        id: "street-map",
        marker: p,
        setAll: false,
        zoom: 15,
        height: 50
      },
      {},
      {}
    )}</div>

                        <div class="column is-half">${validate_component(PlacemarkMap, "PlacemarkMap").$$render(
      $$result,
      {
        id: "satellite-map",
        marker: p,
        setAll: false,
        zoom: 15,
        height: 50,
        showLayer: "Satellite"
      },
      {},
      {}
    )}
                        </div></div>
                    <div class="columns"><div class="column is-half">${validate_component(PlacemarkMap, "PlacemarkMap").$$render(
      $$result,
      {
        id: "all-marker-map",
        setAll: true,
        height: 50,
        location: placemarkLocation
      },
      {},
      {}
    )}</div>

                        <div class="column is-half">${validate_component(Weather, "Weather").$$render($$result, { lat: placemark?.lat, lng: placemark?.lng }, {}, {})}
                        </div></div>

                    <div class="box"><p id="description"${add_attribute("contenteditable", isEditable, 0)}>${escape(editableValuesList["description"])}</p>
                        <br>
                        <p>Category: <span id="category"${add_attribute("contenteditable", isEditable, 0)}>${escape(editableValuesList["category"])}</span></p>

                        <table class="table is-fullwidth table is-bordered table is-striped"><tbody><tr><td>Latitude</td>
                                <td id="lat"${add_attribute("contenteditable", isEditable, 0)}>${escape(editableValuesList["lat"])}</td></tr>
                            <tr><td>Longitude</td>
                                <td id="lng"${add_attribute("contenteditable", isEditable, 0)}>${escape(editableValuesList["lng"])}</td></tr>
                            </tbody></table>

                        ${isEditable ? `${validate_component(ImageSelect, "ImageSelect").$$render(
      $$result,
      {
        fileName: "Select a File",
        showMessageImageUploadStatus,
        imageUploadSuccess
      },
      {},
      {}
    )}` : ``}

                        ${each(p.image_list, (img) => {
      return `${isEditable ? `<div class="card my-3 py-3"><div class="card-image"><figure class="image is-256x256"><img${add_attribute("src", img, 0)} alt="">
                                        </figure></div>
                                    <div class="card-content"><button class="button is-danger ml-2">Delete
                                        </button></div>
                                </div>` : ``}
                            ${!isEditable ? `<figure class="image is-256x256"><img${add_attribute("src", img, 0)} alt="">
                                </figure>` : ``}`;
    })}
                    </div></div>
            </div>`;
  })}` : `<div class="card-content"><div class="content"><p class="has-text-centered is-size-3">Loading...</p></div></div>`}</div>`;
});
export {
  Page as default
};
