import http from './httpService';

const apiEndPoint = "/register/";

function userUrl(id) {
    return `${apiEndPoint}/${id}`
}

export async function register(user) {
    return await http.post(apiEndPoint, {
        username: user.username,
        password: user.password,
        first_name: user.firstname,
        last_name: user.lastname,
        email: user.email
    }, user)
}

export async function getUser(id) {
    return await http.get(userUrl(id))
}