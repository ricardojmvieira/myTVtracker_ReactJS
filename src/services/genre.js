import { apiRequest } from "../configs/apiMiddleware";

export default {
    getAll: () => apiRequest("GET", `/genre`),
    create: (body) => apiRequest("POST", `/genre`, { body }),
    remove: (genreId) => apiRequest("DELETE", `/genre/${genreId}`),
};
