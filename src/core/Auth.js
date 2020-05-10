import React from "react";
import AuthContext from "../configs/authContext";

export default class AuthComponent extends React.Component {
    constructor(props) {
        super(props);
        const user = sessionStorage.getItem("user");//verificar es ja está alguma coisa na session
        this.state = {
            user: user ? JSON.parse(user) : undefined,//se tiver mete esse valor no user se não mete undefined
            login: this.login,//associar metedos
            logout: this.logout,
        };
    }
    login = (user) => {
        sessionStorage.setItem("user", JSON.stringify(user));//alterar user
        this.setState({ user: user });//alterar o estado do component com valor recebido por parametro
    };
    logout = () => {
        sessionStorage.removeItem("user");//remover elemento da session
        this.setState({ user: undefined });//alterar estado 
    };
    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
