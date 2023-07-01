import { c as create_ssr_component, v as validate_component } from "../../chunks/index2.js";
import { H as Header } from "../../chunks/Header.js";
import { W as WelcomeNavigator } from "../../chunks/WelcomeNavigator.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, { subTitle: "Welcome" }, {}, {
    default: () => {
      return `${validate_component(WelcomeNavigator, "WelcomeNavigator").$$render($$result, {}, {}, {})}`;
    }
  })}

<div class="columns is-vcentered content"><div class="column has-text-centered"><div class="box"><div class="columns"><div class="column is-one-third"><figure class="image"><img src="/Logo.png" alt="logo"></figure></div>
                <div class="column"><h1 class="title">GlobeLens:<br>Explore Your Journey Through Your Lens</h1>
                    <p>Map Your Memories. Relive Your Adventures. Inspire New Ones.</p></div></div></div></div></div>
<div class="box has-text-centered"><h1 class="title">Features</h1>

    <div class="columns is-vcentered"><div class="column is-two-thirds"><figure class="image box"><img src="/screenshotDashboard.png" alt="screen shot dashboard"></figure></div>
        <div class="column"><h2 class="subtitle">Map Your Memories</h2>
            <p>Mark memorable locations and organize them into personalized categories. With Globe Lens, your cherished places are never more than a click away.</p></div></div>

    <div class="columns is-vcentered"><div class="column"><h2 class="subtitle">Multi-Map Exploration</h2>
            <p>With each Point of Interest, Globe Lens provides three unique map views and real-time weather information. Explore different aspects of your selected locations and stay updated with current weather conditions. Dive into the details with Globe Lens and let every journey be well-informed and immersive.</p></div>
        <div class="column is-two-thirds"><figure class="image box"><img src="/screenshotPoiMaps.png" alt="screen shot maps for poi"></figure></div></div>

    <div class="columns is-vcentered"><div class="column is-two-thirds"><figure class="image box"><img src="/screenshotDescAndImg.png" alt="Description and Uploaded Images"></figure></div>
        <div class="column"><h2 class="subtitle">Chronicle Your Adventures With Detail and Imagery</h2>
            <p>Add depth to your Points of Interest with personalized descriptions and photos. Narrate your journey with words and capture the essence of each moment with images. With Globe Lens, create a rich, comprehensive diary of your adventures, turning every journey into a story waiting to be told</p></div></div></div>`;
});
export {
  Page as default
};
