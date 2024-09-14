import axios from "axios";

const BASE_URL = "http://localhost:5212/api/v1";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

