import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const ApiService = axios.create({
    baseURL: url,
     headers: {
        'Content-Type': 'application/json'
    }
});