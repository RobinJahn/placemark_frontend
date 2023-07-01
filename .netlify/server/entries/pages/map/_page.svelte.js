import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
import { H as Header } from "../../../chunks/Header.js";
import { M as MainNavigator } from "../../../chunks/MainNavigator.js";
import { P as PlacemarkMap } from "../../../chunks/PlacemarkMap.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, { subTitle: "Map" }, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="box">${validate_component(PlacemarkMap, "PlacemarkMap").$$render($$result, { setAll: true }, {}, {})}</div>`;
});
export {
  Page as default
};
