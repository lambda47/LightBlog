import request from '../../util/request'

export const detail = id => request('/article/detail', 'POST', {id});

export const save = (id, type, article) => request('/article/save', 'POST', {id, type, ...article});

export const add = (type, article) => request('/article/add', 'POST', {type, ...article});

export default {
    detail,
    save,
    add
}