import request from '../../util/request'

export const find = (title, name, page = 1, limit = 5) => request('/article/find', 'POST', {title, name, page, limit});

export const detail = id => request('/article/detail', 'POST', {id});

export const save = (id, type, article) => request('/article/save', 'POST', {id, type, ...article});

export const add = (type, article) => request('/article/add', 'POST', {type, ...article});

export default {
    detail,
    save,
    add,
    find
}