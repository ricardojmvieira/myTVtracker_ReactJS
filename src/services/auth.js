import { apiRequest } from "../configs/apiMiddleware";
const register = (body) => {
    return apiRequest("POST", "/user/register", body);
}; const login = (body) => {
    return apiRequest("POST", "/user/login", body);
}; export default {
    register,
    login,
};
