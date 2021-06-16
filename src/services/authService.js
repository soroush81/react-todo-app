import http from './httpService';
import jwtDecode from 'jwt-decode'


const apiEndPoint = "/auth";
const tokenKey = "token"

export async function login(username, password) {
    const { data: jwt } = await http.post(apiEndPoint, { username, password });
    localStorage.setItem(tokenKey, jwt)
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey)
        return jwtDecode(jwt)
    } catch (ex) {
        return null;
    }
}

const authService = { login, getCurrentUser }
export default authService;