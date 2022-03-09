const serverURL = "http://localhost:5000";

export const apiRequest = (method, route, params) => {

    let currentUser = sessionStorage.getItem("user");//se exister algum utilizador recebemo-lo
    return new Promise((resolve, reject) => {
        let serviceUrl = serverURL + route;
        fetch(serviceUrl, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(currentUser && { Authorization: JSON.parse(currentUser).token }),//se existir user quero criar o header de autorização e quero lá por o token dessa string 
            },
            ...(params && params.body && { body: JSON.stringify(params.body) }),//abrir pedidos
        })
            .then((res) => parseResponse(res))//esperar resposta faz parsing para json
            .then((data) => resolve(data))//obj e damos resolve 
            .catch((err) => {
                console.error(`error ${method} ${route}: ${err.message}`);
                reject(err);
            });

    });
};

const parseResponse = (response) =>
    new Promise((resolve, reject) => {
        if (response.ok) {
            resolve(response.json());
        } else {
            reject(response.text());
        }
    });