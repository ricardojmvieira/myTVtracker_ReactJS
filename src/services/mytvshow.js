import { apiRequest } from "../configs/apiMiddleware";

export default {
    getAll: () => apiRequest("GET", `/mytvshow`),
    getOne: (id) => apiRequest("GET", `/mytvshow/${id}`),
    create: (id, body) => apiRequest("POST", `/mytvshow/${id}`,  { body } ),
    update: (id, body) => apiRequest("PUT", `/mytvshow/${id}`, { body }),
    remove: (tvshowId) => apiRequest("DELETE", `/mytvshow/${tvshowId}`),
};