// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios from "axios";
import { user, latestPlacemark } from "../stores";

export const placemarkService = {
    // baseUrl: "https://charmed-crystalline-allosaurus.glitch.me/",
    // baseUrl: "https://placemark-backend.onrender.com",
    baseUrl: "http://localhost:4000",

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (!response.data.success) {
                return false;
            }

            const userResponse = await this.getUser(response.data._id);

            user.set({
                email: email,
                token: response.data.token,
                isAdmin: userResponse.isAdmin
            });
            localStorage.user = JSON.stringify({
                email: email,
                token: response.data.token,
                isAdmin: userResponse.isAdmin
            });
            return true;


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
            token: "",
            isAdmin: false
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
                token: savedUser.token,
                isAdmin: savedUser.isAdmin
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    },

    async getUser(user) {
        try {
            const response = await axios.get(this.baseUrl + "/api/users/" + user);
            return response.data;
        } catch (error) {
            return [];
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
    },

    async updatePlacemark(id, placemark) {
        try {
            const response = await axios.put(this.baseUrl + "/api/placemarks/" + id, placemark);
            if (response.data) {
                latestPlacemark.set(response.data);
            }
            return response.data;
        }
        catch (error) {
            return [];
        }
    },

    async uploadImage(id, fromdata) {
        try {
            let result = await axios.post(this.baseUrl + "/api/placemarks/" + id + "/addImage", fromdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return result.data;
        } catch (error) {
            console.log(error)
            return [];
        }
    },

    async deleteImage(id, imageUrl) {
        try {
            let result = await axios.delete(this.baseUrl + "/api/placemarks/" + id + "/deleteImage", {
                data: {
                    imageUrl: imageUrl
                }
            });
            return result.data;
        } catch (error) {
            console.log(error)
            return [];
        }
    },

    // admin functions

    async deleteUser(id) {
        try {
            let result = await axios.delete(this.baseUrl + "/api/users/" + id);
            return result.data;
        } catch (error) {
            console.log(error)
            return [];
        }
    },

    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl + "/api/users");
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async getStatistics(type) {
        try {
            const response = await axios.get(this.baseUrl + "/api/statistics", {
                params: {
                    type: type
                }
            });
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async deletePlacemark(id) {
        try {
            let result = await axios.delete(this.baseUrl + "/api/placemarks/" + id);
            return result.data;
        } catch (error) {
            console.log(error)
            return [];
        }
    }
};
