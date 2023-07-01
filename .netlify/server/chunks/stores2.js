import { w as writable } from "./index.js";
const user = writable({
  email: "",
  token: "",
  isAdmin: false
});
const latestPlacemark = writable(null);
const imageUploadSuccessful = writable(null);
export {
  imageUploadSuccessful as i,
  latestPlacemark as l,
  user as u
};
