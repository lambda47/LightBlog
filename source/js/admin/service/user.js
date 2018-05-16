import request from '../../util/request'

export const login = (username, password, remember_me) => request('/user/login', 'POST', {username, password, remember_me});

export const password = (oldPassword, newPassword, confirmPassword) =>
    request('/user/password', 'POST', {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
    });

export default {
    login,
    password
}