import { apiFetch } from "./api";

export const token = localStorage.getItem('token');

export const update_language = (selectedLanguage) =>
    apiFetch(`language/update_language/?language=${selectedLanguage}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

    export const get_all_language_updates = () =>
        apiFetch('language/get_all_language_updates', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })