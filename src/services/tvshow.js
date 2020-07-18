import { apiRequest } from "../configs/apiMiddleware";

export default {
  getAll: () => apiRequest("GET", `/tvshow`),
  getOne: (id) => apiRequest("GET", `/tvshow/${id}`),
  create: (body) => apiRequest("POST", `/tvshow`, { body }),
  update: (id, body) => apiRequest("PUT", `/tvshow/${id}`, { body }),
  remove: (id) => apiRequest("DELETE", `/tvshow/${id}`),
};
