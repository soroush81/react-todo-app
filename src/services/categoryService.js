import http from './httpService'

let categories = [];
const apiEndPoint = "/categories/";

function categoriesUrl(id) {
    return `${apiEndPoint}${id}/`
}
export async function getCategories() {
    console.log('mmmmmmmmmmmmmmmmmmm')
    const { data } = await http.get(apiEndPoint)
    categories = data;
    console.log(data)
    return categories;
}

export async function getCatgeory(id) {
    const { data } = await http.get(categoriesUrl(id));
    return data;
}

