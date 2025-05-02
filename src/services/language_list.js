import { apiFetch } from "./api";

const token = localStorage.getItem('token');

export const create_language_list = (json) =>
    apiFetch('language_lists/create_language_list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(json),

    })

export const get_language_list = () =>
    apiFetch('language_lists/get_language_list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

export const delete_language = (language_id) =>
    apiFetch(`language_lists/delete_language/?id=${language_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })