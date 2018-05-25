import request from '../../util/request';

export const get = () => request('/setting/info', 'POST', {});

export const set = (title, intro, draft, content) => request('/setting/info/save', 'POST', {title, intro, draft, content});

export default {
    get,
    set
}
