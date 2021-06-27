import http from './httpService';
import jwtDecode from 'jwt-decode'


const apiEndPoint = "/login";
const tokenKey = "token"

export async function login(username, password) {
    const { data } = await http.post("http://localhost:8080/login/", { username, password });
    localStorage.setItem(tokenKey, data['token'])
    return data
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey)
        //const a = jwtDecode(jwt)
        return jwt
    } catch (ex) {
        return null;
    }
}

const authService = { login, getCurrentUser }
export default authService;