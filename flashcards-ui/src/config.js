const hostname = window.location.hostname;

export const API_BASE_URL = hostname === "localhost" 
    ? "http://localhost:8080" 
    : "http://192.168.1.150:8080";