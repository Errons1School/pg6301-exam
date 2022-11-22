import React from "react";
import { fetchJSON } from "./library/fetchJSON";
import { postJSON } from "./library/postJSON";

export const CateringApi = React.createContext({
    async endSession() {
        const res = await fetch("/api/login", { method: "DELETE" });
        if (!res.ok) {
            throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
        }
    },
    async listCatering() {
        return await fetchJSON("/api/catering");
    },
    async createCatering(catering) {
        return await postJSON("/api/catering/new", catering);
    },
    async deleteCatering(catering) {
        const res = await fetch("/api/catering/delete?" + new URLSearchParams(catering),
            { method: "DELETE" });
        if (!res.ok) {
            throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
        }
    },
});