import http from './httpService'

let todos = [];
const apiEndPoint = "/todos/";

function todosUrl(id) {
    return `${apiEndPoint}${id}/`
}
export async function getTodos(userId) {
    const { data } = await http.get(apiEndPoint)
    todos = data;
    todos = todos.filter(todo => todo.user && todo.user.id === userId)
    return todos;
}

export async function getTodo(id) {
    const { data } = await http.get(todosUrl(id));
    console.log(data)
    return data;
}

export async function deleteTodo(id) {
    return await http.delete(todosUrl(id))
}

export async function saveTodo(todo) {
    if (todo.id && todo.id !== "") {
        const body = { ...todo };
        delete body.id
        return await http.put(todosUrl(todo.id), body)
    }
    return await http.post(apiEndPoint, todo)
}