import axios from "axios";

//const BASE_URL_API_GATEWAY = 'https://45tgf3qauc.execute-api.us-east-1.amazonaws.com/hotel-reservations';
const BASE_URL_LOCALHOST = 'http://localhost:8200/api/hotel-reservations-service'

export const axiosPrivate = axios.create({
    baseURL:BASE_URL_LOCALHOST,
    headers:{'Content-Type':'application/json'}
})