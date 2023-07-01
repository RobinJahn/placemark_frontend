import { c as create_ssr_component, b as each, d as add_attribute, v as validate_component, e as escape } from "../../../chunks/index2.js";
import { M as MainNavigator } from "../../../chunks/MainNavigator.js";
import { H as Header } from "../../../chunks/Header.js";
const ImageGallery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { images = [] } = $$props;
  if ($$props.images === void 0 && $$bindings.images && images !== void 0)
    $$bindings.images(images);
  return `<div class="columns is-multiline">${each(images, (image) => {
    return `<div class="column is-one-quarter-desktop is-half-tablet"><div class="card"><div class="card-image"><figure class="image"><img${add_attribute("src", image, 0)} alt=""></figure>
            </div></div>
    </div>`;
  })}</div>`;
});
function hasImages(categoryAndImages) {
  if (Object.keys(categoryAndImages).length === 0) {
    return false;
  } else {
    let foundImage = false;
    for (let category in categoryAndImages) {
      if (categoryAndImages[category].length > 0) {
        foundImage = true;
      }
    }
    return foundImage;
  }
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categoryAndImages = {};
  return `${validate_component(Header, "Header").$$render($$result, { subTitle: "Image Gallery" }, {}, {
    default: () => {
      return `${validate_component(MainNavigator, "MainNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}


<div class="box">${each(Object.keys(categoryAndImages), (category) => {
    return `${categoryAndImages[category] && categoryAndImages[category].length > 0 ? `<section class="box"><h1 class="title">${escape(category)}</h1>
                ${validate_component(ImageGallery, "ImageGallery").$$render($$result, { images: categoryAndImages[category] }, {}, {})}
            </section>` : ``}`;
  })}
    ${hasImages(categoryAndImages) === false ? `<div class="has-text-centered"><h1 class="title">You haven&#39;t uploaded any photos yet</h1></div>` : ``}</div>`;
});
export {
  Page as default
};
