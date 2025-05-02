import { apiFetch } from "./api";

export const token = localStorage.getItem('token');

export const update_english = (english_id, englishJson) =>
    apiFetch(`english/update_english/?id=${english_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(englishJson),
    })

        export const get_all_english_updates = () =>
            apiFetch('english/get_all_english_updates', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })