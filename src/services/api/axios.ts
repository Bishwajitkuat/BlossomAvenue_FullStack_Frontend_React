import axios from "axios";

const BASE_URL =
  "https://blossomavenue-f2grfmdmepbcb4es.northeurope-01.azurewebsites.net/api/v1";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
