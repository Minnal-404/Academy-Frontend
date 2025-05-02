import { apiFetch } from "./api";

const token = localStorage.getItem('token');

export const approve_language = (email) =>
    apiFetch(`approvals/approve_language/?email=${email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

    export const reject_language = (json) =>
    apiFetch(`approvals/reject_language`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(json),

    })

    export const approve_english = (english_id) =>
    apiFetch(`approvals/approve_english/?id=${english_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    
    export const reject_english = (json) =>
    apiFetch(`approvals/reject_english/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(json),

    })
   
    export const approve_project = (project_id) =>
        apiFetch(`approvals/approve_project/?id=${project_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
  
        export const reject_project = (json) =>
        apiFetch(`approvals/reject_project`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(json),
    
        })
       