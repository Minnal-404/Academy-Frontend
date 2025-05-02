import { apiFetch } from "./api";

const token = localStorage.getItem('token');
 export const rank_filter = (rank) =>
            apiFetch(`filters/rank_filter/?rank=${rank}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
 
            export const language_filter = (language) =>
            apiFetch(`filters/language_filter/?language=${language}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })

            export const filter_profiles = (params) =>
            apiFetch(`filters/filter_profiles?${params}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
