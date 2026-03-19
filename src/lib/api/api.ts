import axios from "axios";

export const api = axios.create();

api.interceptors.request.use((config) => {
    config.headers.Authorization = `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`;
    return config;
});
