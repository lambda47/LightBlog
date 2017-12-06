import request from '../../util/request'

export const login = (username, password) => request('/user/login', 'POST', {username, password});

export default {
    login
}