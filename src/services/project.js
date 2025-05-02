import { apiFetch } from "./api";

const token = localStorage.getItem('token');

export const create_project = (payload) =>
    apiFetch('project/create_project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    })

export const update_project = (project_id, projectUpdate) =>
    apiFetch(`project/update_project/?project_id=${project_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectUpdate),
    })

    export const delete_project = (project_id) =>
    apiFetch(`project/delete_project/?project_id=${project_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

    export const get_all_project_updates = () =>
        apiFetch('project/get_all_project_updates', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })