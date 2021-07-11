import http from './httpService'

let categories = [];
const apiEndPoint = "/categories/";

function categoriesUrl(id) {
    return `${apiEndPoint}${id}/`
}
export async function getCategories() {
    const { data } = await http.get(apiEndPoint)
    console.log(data)
    categories = data;
    return categories;
}

export async function getCatgeory(id) {
    const { data } = await http.get(categoriesUrl(id));
    return data;
}

