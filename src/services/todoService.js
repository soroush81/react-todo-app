import http from './httpService'
import axios from 'axios'

let todos = [];
const apiEndPoint = "/todos/";

function todosUrl(id) {
    return `${apiEndPoint}${id}`
}
export async function getTodos() {
    const { data } = await axios.get('http://localhost:8000/api/todos/')
    todos = data;
    return todos;
}

export async function getTodo(id) {
    const { data } = await http.get(todosUrl(id));
    return data;
}

export async function deleteTodo(id) {
    return await http.delete(todosUrl(id))
}

export async function saveTodo(todo) {
    const body = { ...todo };
    delete todo._id

    if (todo._id && todo._id !== "") {
        return await http.put(todosUrl(todo._id), body)
    }
    return await http.post(apiEndPoint, body)
}