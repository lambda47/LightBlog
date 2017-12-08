import request from '../../util/request'

export const login = (username, password, remember_me) => request('/user/login', 'POST', {username, password, remember_me});

export default {
    login
}