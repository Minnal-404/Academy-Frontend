import { apiFetch } from "./api";

const token = localStorage.getItem('token');

export const get_all_students = () =>
    apiFetch('user/get_all_students', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

export const get_all_companies = () =>
    apiFetch('user/get_all_companies', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })
    

