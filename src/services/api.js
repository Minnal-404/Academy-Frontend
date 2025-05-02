const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint, options={}) => {
    const url = `${API_BASE}/${endpoint}`;
    const response = await fetch(url, {
        method: 'GET',

        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
    });



    return response;
};