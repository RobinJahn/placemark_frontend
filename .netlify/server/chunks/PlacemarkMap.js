import { c as create_ssr_component, d as add_attribute, e as escape } from "./index2.js";
import { l as latestPlacemark } from "./stores2.js";
function addPlacemarkMarker(map, placemark) {
  const text = `<a href='/poi/${placemark._id}'> ${placemark.name} <br/> <small>{click for details}</small></a>`;
  map.addMarker({ lat: placemark.lat, lng: placemark.lng }, text, placemark.category);
}
const PlacemarkMap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "placemark-map" } = $$props;
  let { marker = null } = $$props;
  let { setAll = false } = $$props;
  let { height = 70 } = $$props;
  let { showLayer = "Terrain" } = $$props;
  let { zoom = 8 } = $$props;
  let { location = null } = $$props;
  let map;
  let categories = [];
  latestPlacemark.subscribe((placemark) => {
    if (placemark && map) {
      if (!categories.includes(placemark.category)) {
        map.addLayerGroup(placemark.category);
      }
      addPlacemarkMarker(map, placemark);
      map.moveTo(zoom, { lat: placemark.lat, lng: placemark.lng });
    }
  });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.marker === void 0 && $$bindings.marker && marker !== void 0)
    $$bindings.marker(marker);
  if ($$props.setAll === void 0 && $$bindings.setAll && setAll !== void 0)
    $$bindings.setAll(setAll);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.showLayer === void 0 && $$bindings.showLayer && showLayer !== void 0)
    $$bindings.showLayer(showLayer);
  if ($$props.zoom === void 0 && $$bindings.zoom && zoom !== void 0)
    $$bindings.zoom(zoom);
  if ($$props.location === void 0 && $$bindings.location && location !== void 0)
    $$bindings.location(location);
  return `<div class="box"${add_attribute("id", id, 0)} style="${"height:" + escape(height, true) + "vh"}"></div>`;
});
export {
  PlacemarkMap as P
};
