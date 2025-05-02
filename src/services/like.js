
import { apiFetch } from "./api";

const token = localStorage.getItem('token');
export const like = (email) =>
    apiFetch(`likes/like/?email=${email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
export const unlike = (email) =>
    apiFetch(`likes/unlike/?email=${email}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
