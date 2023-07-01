import { c as create_ssr_component, e as escape, v as validate_component } from "./index2.js";
const TitleBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { subTitle = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subTitle === void 0 && $$bindings.subTitle && subTitle !== void 0)
    $$bindings.subTitle(subTitle);
  return `<div class="has-text-centered columns my-3"><div class="column"><img src="/Logo.png" width="60" alt="img"></div>
    <div class="column"><div class="title is-5">${escape(title)}</div>
        <div class="subtitle is-5">${escape(subTitle)}</div></div>
    <div class="column"><img src="/Logo.png" width="60" alt="img"></div></div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { subTitle = "" } = $$props;
  if ($$props.subTitle === void 0 && $$bindings.subTitle && subTitle !== void 0)
    $$bindings.subTitle(subTitle);
  return `<div class="tile is-ancestor mt-3"><div class="tile is-horizontal"><div class="tile is-parent"><div class="tile is-child box">${validate_component(TitleBar, "TitleBar").$$render($$result, { title: "GlobeLens", subTitle }, {}, {})}</div></div>
        <div class="tile is-parent"><div class="tile is-child box">${slots.default ? slots.default({}) : ``}</div></div></div></div>`;
});
export {
  Header as H
};
