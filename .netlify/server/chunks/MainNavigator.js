import { c as create_ssr_component, o as onDestroy } from "./index2.js";
import { u as user } from "./stores2.js";
const MainNavigator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isAdmin = true;
  let unsubscribe = user.subscribe((value) => {
    if (value !== null) {
      isAdmin = value.isAdmin;
    }
  });
  onDestroy(() => {
    unsubscribe();
  });
  return `<div class="has-text-centered columns my-3"><a href="/dashboard" class="column "><i class="fas fa-th-list fa-3x" style="color:rgb(63, 122, 139)"></i></a>
    <a href="/map" class="column "><i class="fas fa-map-marked-alt fa-3x" style="color:rgb(102, 153, 255)"></i></a>
    <a href="/imagegallery" class="column"><i class="fas fa-images fa-3x" style="color:rgb(255, 153, 51)"></i></a>
    ${isAdmin ? `<a href="/admin" class="column"><i class="fas fa-users-cog fa-3x" style="color:rgb(255, 102, 102)"></i></a>` : ``}
    <a href="/logout" class="column"><i class="fas fa-sign-out-alt fa-3x" style="color:rgb(156, 70, 128)"></i></a></div>`;
});
export {
  MainNavigator as M
};
