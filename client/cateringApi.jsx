import React from "react";
import { fetchJSON } from "./library/fetchJSON";
import { postJSON } from "./library/postJSON";

export const CateringApi = React.createContext({
    async fetchLogin() {
        return await fetchJSON("/api/login");
    },
    async listCatering(query) {
        return await fetchJSON("/api/catering?" + new URLSearchParams(query));
    },
    async createCatering(catering) {
        return await postJSON("/api/catering", catering);
    },
    async endSession() {
        const res = await fetch("/api/login", { method: "DELETE" });
        if (!res.ok) {
            throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
        }
    },
});