import { apiRequest } from "../configs/apiMiddleware";

export default {
    getAll: () => apiRequest("GET", `/mytvshow`),
    getOne: (id) => apiRequest("GET", `/mytvshow/${id}`),
    create: (tvshowId) => apiRequest("POST", `/mytvshow/${tvshowId}`),
    update: (id, body) => apiRequest("PUT", `/mytvshow/${id}`, { body }),
    remove: (tvshowId) => apiRequest("DELETE", `/mytvshow/${tvshowId}`),
};