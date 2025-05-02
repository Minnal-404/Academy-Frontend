import { apiFetch } from "./api";

export const login = (credentials) =>
  apiFetch('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

export const sign_up = (credentials) =>
    apiFetch('auth/sign_up', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
      });
  