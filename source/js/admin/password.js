import 'admin/password.scss';
import Vue from 'vue';
import Menu from 'menu';
import Message from 'message';
import UserService from './service/user'

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Menu);
    Vue.use(Message, {transitionName: 'message-fade', duration: 2, classPre: 'admin'});

    let vm = new Vue({
        el: '#app',
        data: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        methods: {
            async setPassword() {
                let {code, msg} = await UserService.password(this.oldPassword, this.newPassword, this.confirmPassword);
                if (code === 1000) {
                    this.$message.info('修改成功');
                } else {
                    this.$message.error(msg);
                }
            }
        }
    });
}, false);
