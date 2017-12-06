import request from '../../util/request';

export const find = name => request('/tag/find', 'POST', {name});

export const add = (name, logo) => request('/tag/add', 'POST', {name, logo});

export const edit = (id, name, logo) => request('/tag/edit', 'POST', {id, name, logo});

export const del = id => request('/tag/del', 'POST', {id});

export default {
    find,
    add,
    edit,
    del
}