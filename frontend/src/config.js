const rawApiUrl = "http://localhost:3000" || import.meta.env.VITE_API_URL;
export const API_URL = rawApiUrl.replace(/\/+$/, "");
