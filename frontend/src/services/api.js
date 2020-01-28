export const URL_API = "http://localhost:8000/api/";

const api = axios.create({
  baseURL: URL_API
});

export default api;
