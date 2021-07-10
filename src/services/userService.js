import http from './httpService';

const apiEndPoint = "/users";

function userUrl(id) {
    return `${apiEndPoint}/${id}`
}

export async function register(user) {
    console.log('regiiiiiiiiii')
    return await http.post('http://localhost:8080/api/register/', {
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