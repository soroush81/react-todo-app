import http from './httpService';

const apiEndPoint = "/users";

function userUrl(id) {
    return `${apiEndPoint}/${id}`
}

export async function register(user) {
    return await http.post(apiEndPoint, {
        email: user.username,
        password: user.password,
        name: user.name
    }, user)
}

export async function getUser(id) {
    return await http.get(userUrl(id))
}