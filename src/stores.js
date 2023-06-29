import { writable } from "svelte/store";

export const user = writable({
    email: "",
    token: "",
    isAdmin: false
});

export const latestPlacemark = writable(null);

export const imageUploadSuccessful = writable(null);
