// @ts-nocheck
import axios from "axios";
import { goto } from "$app/navigation";
import { user, latestPlacemark } from "../stores";

export const placemarkService = {
    //baseUrl: "https://placemark-backend.glitch.me/",
    baseUrl: "http://localhost:4000",

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token
                });
                localStorage.user = JSON.stringify({ email: email, token: response.data.token });
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async signup(firstName, lastName, email, password) {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
            await axios.post(this.baseUrl + "/api/users", userDetails);

            let loginWorked = await this.login(email, password)
            if (!loginWorked) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    },

    async logout() {
        user.set({
            email: "",
            token: ""
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("user");
    },

    reload() {
        const userCredentials = localStorage.user;
        if (userCredentials) {
            const savedUser = JSON.parse(userCredentials);
            user.set({
                email: savedUser.email,
                token: savedUser.token
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    },

    async getPlacemark(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/placemarks/" + id);
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async getPlacemarks() {
        try {
            const response = await axios.get(this.baseUrl + "/api/placemarks");
            return response.data;
        } catch (error) {
            return [];
        }
    },


    async createPlacemark(placemark) {
        try {
            const response = await axios.post(this.baseUrl + "/api/placemarks", placemark);
            if (response.data) {
                latestPlacemark.set(response.data);
            }

            return response.data;
        }
        catch (error) {
            return [];
        }
    }
};
