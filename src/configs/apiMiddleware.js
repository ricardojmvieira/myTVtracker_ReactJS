const serverURL = "http://localhost:5000";

export const apiRequest = (method, route, body) => {
    let currentUser = sessionStorage.getItem("user");//se exister algum utilizador recebemo-lo
    return new Promise((resolve, reject) => {
        fetch(serverURL + route, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(currentUser && { Authorization: JSON.parse(currentUser).token }),//se existir user quero criar o header de autorização e quero lá por o token dessa string 
            },
            ...(body && { body: JSON.stringify(body) }),//abrir pedidos
        })
            .then((res) => res.json())//esperar resposta faz parsing para json
            .then((data) => resolve(data))//obj e damos resolve 
            .catch((err) => {
                console.error(`error ${method} ${route}: ${err.message}`);
                reject(err);
            });
    });
};