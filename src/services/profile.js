import { apiFetch } from "./api";

const token = localStorage.getItem('token');

export const get_all_profiles = () =>
    apiFetch('profile/get_all_profiles', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

export const get_all_updates = () =>
    apiFetch('profile/get_all_updates', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

export const get_profile = () =>
    apiFetch('profile/get_profile', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

export const create_profile = (profile) =>
    apiFetch('profile/create_profile', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
    })
