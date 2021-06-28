import http from './httpService';
import jwtDecode from 'jwt-decode'


const apiEndPoint = "/token/";
const tokenKey = "token"

export async function login(username, password) {
    const { data } = await http.post(apiEndPoint, { username, password });
    localStorage.setItem(tokenKey, data['access'])
    return data
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey)
        return jwtDecode(jwt)
    } catch (ex) {
        return null;
    }
}

export function logout() {
    localStorage.removeItem(tokenKey)
}
const authService = { login, logout, getCurrentUser }
export default authService;