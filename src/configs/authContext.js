import React from "react";

//contexto de autenticação
const AuthContext = React.createContext({
    user: undefined,
    login: () => { },
    logout: () => { },

});

export default AuthContext;

