import { c as create_ssr_component, d as add_attribute, v as validate_component, e as escape } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainNavigator } from "../../../chunks/MainNavigator.js";
import { P as PlacemarkMap } from "../../../chunks/PlacemarkMap.js";
const Coordinates = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { lat = 0 } = $$props;
  let { lng = 0 } = $$props;
  if ($$props.lat === void 0 && $$bindings.lat && lat !== void 0)
    $$bindings.lat(lat);
  if ($$props.lng === void 0 && $$bindings.lng && lng !== void 0)
    $$bindings.lng(lng);
  return `<div class="box field is-horizontal"><div class="field-label is-normal"><label for="lng" class="label">Lat</label></div>
    <div class="field-body"><div class="field"><p class="control is-expanded"><input id="lng" class="input" type="float"${add_attribute("value", lat, 0)}></p></div>
        <div class="field-label is-normal"><label for="lat" class="label">Lng</label></div>
        <div class="field"><p class="control is-expanded "><input id="lat" class="input" type="float"${add_attribute("value", lng, 0)}></p></div></div></div>`;
});
const PlacemerkForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  let category = "";
  let lat = 59.328;
  let lng = 18.0914;
  let message = "Create a new Placemark";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<form><div class="field"><label class="label" for="name">Enter Name</label>
        <input class="input" id="name" name="name" type="text" placeholder="My new placemark!"${add_attribute("value", name, 0)}></div>
    <div class="field"><label class="label" for="category">Enter Category</label>
        <input class="input" id="category" name="category" type="text" placeholder="Other"${add_attribute("value", category, 0)}></div>
    ${validate_component(Coordinates, "Coordinates").$$render(
      $$result,
      { lat, lng },
      {
        lat: ($$value) => {
          lat = $$value;
          $$settled = false;
        },
        lng: ($$value) => {
          lng = $$value;
          $$settled = false;
        }
      },
      {}
    )}
    <div class="field"><div class="control"><button class="button is-link is-light">Create</button></div></div>
    <div class="box">${escape(message)}</div></form>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, { subTitle: "Dashboard" }, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns is-vcentered"><div class="column"><div class="box">${validate_component(PlacemarkMap, "PlacemarkMap").$$render($$result, { setAll: true }, {}, {})}</div></div>
    <div class="column box has-text-centered"><h1 class="title is-4">Create a new Placemark</h1>
        ${validate_component(PlacemerkForm, "PlacemerkForm").$$render($$result, {}, {}, {})}</div></div>`;
});
export {
  Page as default
};
