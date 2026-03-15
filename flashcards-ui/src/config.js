const hostname = window.location.hostname;

export const API_BASE_URL = hostname === "localhost" 
    ? "http://localhost:8080" 
    : "http://3.27.219.81:8080";